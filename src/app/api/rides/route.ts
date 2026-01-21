import {NextResponse} from "next/server";
import {dbConnect} from "@/lib/mongodb";
import {Ride} from "@/models/Ride";

function buildRideAt(dateStr: string, timeStr: string) {
  // dateStr: "YYYY-MM-DD", timeStr: "HH:mm"
  // Tworzymy lokalny czas (jak w przeglądarce). Na hostingu różnice stref to temat na później (da się dopiąć).
  const [y, m, d] = dateStr.split("-").map(Number);
  const [hh, mm] = timeStr.split(":").map(Number);

  const rideAt = new Date(y, m - 1, d, hh, mm, 0, 0);

  if (Number.isNaN(rideAt.getTime())) throw new Error("Invalid date/time");
  return rideAt;
}

export async function GET(req: Request) {
  try {
    await dbConnect();

    const {searchParams} = new URL(req.url);

    const now = new Date();

    const page = Number(searchParams.get("page") ?? "1");
    const limit = Number(searchParams.get("limit") ?? "6");
    const type = searchParams.get("type") ?? "all";

    const safePage = Number.isFinite(page) && page > 0 ? page : 1;
    const safeLimit =
      Number.isFinite(limit) && limit > 0 && limit <= 50 ? limit : 6;

    const filter: Record<string, unknown> = {
      rideAt: {$gt: now},
    };

    if (type !== "all") filter.type = type;

    const skip = (safePage - 1) * safeLimit;

    const [items, total] = await Promise.all([
      Ride.find(filter).sort({rideAt: 1}).skip(skip).limit(safeLimit).lean(),
      Ride.countDocuments(filter),
    ]);

    return NextResponse.json({
      items,
      total,
      page: safePage,
      limit: safeLimit,
      pages: Math.max(1, Math.ceil(total / safeLimit)),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({error: "Server error"}, {status: 500});
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const {type, from, to, date, time, seats, contact, note} = body;

    // Minimalna walidacja backendowa (frontendowi nie ufamy)
    if (!type || !from || !to || !date || !time || !contact) {
      return NextResponse.json(
        {error: "Missing required fields"},
        {status: 400}
      );
    }

    if (!["offer", "need"].includes(type)) {
      return NextResponse.json({error: "Invalid type"}, {status: 400});
    }

    const rideAt = buildRideAt(String(date), String(time));
// zabezpieczenie backend - dodanie ogloszenia na przejazd nie wczesniej niz za 15 minut
    const minRideAt = new Date(Date.now() + 15 * 60 * 1000);
    if (rideAt < minRideAt) {
      return NextResponse.json(
        {error: "Przejazd musi być co najmniej 15 minut od teraz"},
        {status: 400}
      );
    }
    // ✅ automatyczne sprzątanie: np. 6h po przejeździe
    const expiresAt = new Date(rideAt.getTime() + 6 * 60 * 60 * 1000);

    const created = await Ride.create({
      type,
      from: String(from).trim(),
      to: String(to).trim(),
      date: String(date),
      time: String(time),
      rideAt,
      seats: type === "offer" ? Number(seats || 0) : undefined,
      contact: String(contact).trim(),
      note: note ? String(note).trim() : undefined,
      expiresAt,
    });

    return NextResponse.json(created, {status: 201});
  } catch (err) {
    console.error(err);
    return NextResponse.json({error: "Server error"}, {status: 500});
  }
}
