"use client";

import {Formik} from "formik";
import * as Yup from "yup";
import {Field as UiField} from "@/components/rides/ui/Field";
import type {OfferType} from "@/types/offers";

const INPUT =
  "w-full min-w-0 max-w-full rounded-xl border border-slate-700/90 bg-black/20 px-2 py-[11px] text-slate-100 outline-none placeholder:text-slate-400/70 focus:border-blue-400/80";
const INPUTD =
  "w-full min-w-0  rounded-xl border border-slate-700/90 bg-black/20 px-2 py-[11px] text-slate-100 outline-none placeholder:text-slate-400/70 focus:border-blue-400/80";

type FormValues = {
  type: OfferType;
  from: string;
  to: string;
  date: string;
  time: string; // "07:00" (z input type=time)
  seats: string; // trzymamy jako string w formie, potem zrobimy Number
  contact: string;
  note: string;
  agree: boolean;
};

const pad2 = (n: number) => String(n).padStart(2, "0");

const nowPlus15 = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() + 15);
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
};

const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");
const todayStr = `${yyyy}-${mm}-${dd}`;

const initialValues: FormValues = {
  type: "offer",
  from: "Łęczna",
  to: "Bogdanka",
  date: todayStr,
  time: "",
  seats: "2",
  contact: "",
  note: "",
  agree: false,
};

// helpery dla pola telefon lub messenger

const normalizePhone = (v: string) => v.replace(/[^\d+]/g, "");
const onlyDigits = (v: string) => v.replace(/\D/g, "");

const isValidPLPhone = (v: string) => {
  const cleaned = normalizePhone(v);

  // +48XXXXXXXXX
  if (cleaned.startsWith("+48")) {
    return onlyDigits(cleaned).length === 11;
  }

  // XXXXXXXXX
  return onlyDigits(cleaned).length === 9;
};

const isMessengerLink = (v: string) => {
  const lower = v.toLowerCase();
  return (
    lower.startsWith("http://") ||
    lower.startsWith("https://") ||
    lower.startsWith("www.") ||
    lower.includes("m.me/")
  );
};

const Schema = Yup.object({
  type: Yup.mixed<OfferType>().oneOf(["offer", "need"]).required(),
  from: Yup.string().trim().min(2, "Za krótko").required("Wpisz skąd"),
  to: Yup.string().trim().min(2, "Za krótko").required("Wpisz dokąd"),
  date: Yup.string()
    .required("Wybierz datę")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Data w formacie YYYY-MM-DD")
    .test(
      "not-in-past",
      "Nie możesz wybrać daty wcześniejszej niż dziś",
      (val) => {
        if (!val) return false;
        return val >= todayStr;
      }
    ),
  time: Yup.string()
    .required("Podaj godzinę")
    .matches(/^([01]\d|2[0-3]):[0-5]\d$/, "Godzina w formacie HH:MM")
    .test(
      "not-in-past-time",
      "Godzina musi być co najmniej 15 minut od teraz",
      function (val) {
        const {date} = this.parent as {date?: string};

        if (!val || !date) return false;

        // jeśli data w przyszłości -> OK
        if (date > todayStr) return true;

        // jeśli data = dziś -> godzina nie może być wstecz
        if (date === todayStr) {
          return val >= nowPlus15(); // HH:MM też porównuje się poprawnie jako string
        }

        // jeśli data w przeszłości -> nie OK
        return false;
      }
    ),
  seats: Yup.string().when("type", {
    is: "offer",
    then: (s) => s.required("Podaj liczbę miejsc").oneOf(["1", "2", "3", "4"]),
    otherwise: (s) => s.notRequired(),
  }),
  contact: Yup.string()
    .trim()
    .required("Podaj numer telefonu lub link do Messengera")
    .test(
      "phone-or-messenger",
      "Podaj poprawny numer telefonu lub link do Messengera",
      (value) => {
        if (!value) return false;

        // link → OK
        if (isMessengerLink(value)) return true;

        // telefon → walidujemy PL
        return isValidPLPhone(value);
      }
    ),
  note: Yup.string().max(280, "Maks 280 znaków").optional(),
  agree: Yup.boolean().oneOf([true], "Zaznacz zgodę"),
});

export default function AddRideForm({onCreated}: {onCreated?: () => void}) {
  return (
    <section
      id="formPanel"
      className="rounded-[18px] border border-slate-700/70 bg-slate-900/70 p-[14px] overflow-hidden"
    >
      <h2 className="mb-[10px] text-[18px] font-extrabold">Dodaj ogłoszenie</h2>

      <Formik<FormValues>
        initialValues={initialValues}
        validationSchema={Schema}
        validateOnBlur
        validateOnChange={false}
        onSubmit={async (values, helpers) => {
          try {
            helpers.setSubmitting(true);

            const payload = {
              type: values.type,
              from: values.from,
              to: values.to,
              date: values.date,
              time: values.time,
              seats: values.type === "offer" ? Number(values.seats) : undefined,
              contact: values.contact,
              note: values.note?.trim() ? values.note.trim() : undefined,
            };

            const res = await fetch("/api/rides", {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(payload),
            });

            if (!res.ok) {
              const err = await res.json().catch(() => null);
              throw new Error(err?.error || "Nie udało się dodać ogłoszenia");
            }

            onCreated?.();

            helpers.resetForm();
          } catch (e) {
            console.error(e);
            alert(e instanceof Error ? e.message : "Błąd");
          } finally {
            helpers.setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form className="grid gap-2" onSubmit={handleSubmit} noValidate>
            <UiField label="Typ">
              <select
                name="type"
                className={INPUT}
                value={values.type}
                onChange={(e) => {
                  handleChange(e);
                  // jeśli zmienisz na "need" chowamy seats i czyścimy błąd
                  if (e.target.value === "need") setFieldValue("seats", "2");
                }}
                onBlur={handleBlur}
              >
                <option value="offer">Jadę – mogę zabrać</option>
                <option value="need">Szukam podwózki</option>
              </select>
              {touched.type && errors.type && (
                <ErrorText>{errors.type}</ErrorText>
              )}
            </UiField>

            <div className="grid grid-cols-2 gap-[10px]">
              {/* <UiField label="Skąd">
                <select
                  name="from"
                  className={INPUT}
                  value={values.from}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="Łęczna">Łęczna</option>
                  <option value="Puchaczów">Puchaczów</option>
                  <option value="Cyców">Cyców</option>
                  <option value="Inne">Inne</option>
                </select>
                {touched.from && errors.from && (
                  <ErrorText>{errors.from}</ErrorText>
                )}
              </UiField> */}
              <UiField label="Skąd">
                <input
                  name="from"
                  className={INPUT}
                  value={values.from}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.from && errors.from && (
                  <ErrorText>{errors.from}</ErrorText>
                )}
              </UiField>
              <UiField label="Dokąd">
                <input
                  name="to"
                  className={INPUT}
                  value={values.to}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.to && errors.to && <ErrorText>{errors.to}</ErrorText>}
              </UiField>
            </div>

            <div className="grid grid-cols-1 gap-[10px] sm:grid-cols-2">
              <UiField label="Data przejazdu">
                <input
                  name="date"
                  type="date"
                  min={todayStr}
                  className={`${INPUTD} min-w-0`}
                  value={values.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.date && errors.date && (
                  <ErrorText>{errors.date}</ErrorText>
                )}
              </UiField>

              <UiField label="Godzina">
                <input
                  name="time"
                  type="time"
                  className={`${INPUTD} min-w-0`}
                  value={values.time}
                  min={values.date === todayStr ? nowPlus15() : undefined}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.time && errors.time && (
                  <ErrorText>{errors.time}</ErrorText>
                )}
              </UiField>
            </div>

            {values.type === "offer" && (
              <UiField label="Wolne miejsca (tylko jeśli jedziesz)">
                <select
                  name="seats"
                  className={INPUT}
                  value={values.seats}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="1">1 miejsce</option>
                  <option value="2">2 miejsca</option>
                  <option value="3">3 miejsca</option>
                  <option value="4">4 miejsca</option>
                </select>
                {touched.seats && errors.seats && (
                  <ErrorText>{errors.seats}</ErrorText>
                )}
              </UiField>
            )}

            <UiField label="Kontakt (telefon lub link do Messengera)">
              <input
                name="contact"
                className={INPUT}
                value={values.contact}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="np. 500123456 lub https://m.me/twojprofil"
              />
              {touched.contact && errors.contact && (
                <ErrorText>{errors.contact}</ErrorText>
              )}
            </UiField>

            <UiField label="Uwagi (opcjonalnie)">
              <textarea
                name="note"
                className={`${INPUT} min-h-[84px] resize-y`}
                value={values.note}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="np. okolice, zmiana, skąd zabierasz..."
              />
              {touched.note && errors.note && (
                <ErrorText>{errors.note}</ErrorText>
              )}
            </UiField>

            <label className="mt-2 flex gap-2 text-[13px] text-slate-300">
              <input
                name="agree"
                type="checkbox"
                className="mt-1"
                checked={values.agree}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              Rozumiem, że to tablica ogłoszeń. Ustalenia i odpowiedzialność są
              między użytkownikami.
            </label>
            {touched.agree && errors.agree && (
              <ErrorText>{errors.agree}</ErrorText>
            )}

            <div className="mt-3 flex flex-wrap gap-[10px]">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-[14px] py-3 font-semibold text-slate-950 hover:bg-blue-400 disabled:opacity-60"
              >
                Wyślij ogłoszenie
              </button>

              <button
                type="reset"
                onClick={() => {
                  // resetForm jest w helperach, ale tu prościej: wymuś reload initial
                  // Formik resetuje po native reset różnie — więc robimy ręcznie:
                  setFieldValue("type", initialValues.type);
                  setFieldValue("from", initialValues.from);
                  setFieldValue("to", initialValues.to);
                  setFieldValue("date", initialValues.date);
                  setFieldValue("time", initialValues.time);
                  setFieldValue("seats", initialValues.seats);
                  setFieldValue("contact", initialValues.contact);
                  setFieldValue("note", initialValues.note);
                  setFieldValue("agree", initialValues.agree);
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-800/60 px-[14px] py-3 font-semibold text-slate-100 hover:border-slate-600"
              >
                Wyczyść
              </button>
            </div>

            <p className="mt-2 text-[12px] leading-[1.4] text-slate-400">
              Uwaga: serwis nie pośredniczy w płatnościach i nie jest usługą
              taxi. Zachowaj ostrożność.
            </p>

            <div className="mt-[14px] border-t border-slate-700/70 pt-3 text-[12px] leading-[1.45] text-slate-400">
              <div>
                <span className="font-extrabold text-slate-100">
                  Disclaimer:
                </span>{" "}
                To nie jest usługa transportowa ani taxi. Serwis publikuje
                ogłoszenia osób prywatnych.
              </div>
              <div>
                Nie pośredniczymy w płatnościach. Nie weryfikujemy użytkowników.
                Zachowaj ostrożność.
              </div>
            </div>
          </form>
        )}
      </Formik>
    </section>
  );
}

function ErrorText({children}: {children: React.ReactNode}) {
  return <div className="mt-1 text-[12px] text-amber-300/90">{children}</div>;
}
