"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  company: z.string().optional(),
  projectType: z.string().min(1, "Required"),
  budget: z.string().min(1, "Required"),
  message: z.string().min(10, "Required"),
  countryCode: z.string().optional(),
  phoneNumber: z.string().optional(),
  honeypot: z.string().max(0, "Spam detected").optional(),
});

type FormData = z.infer<typeof schema>;

const inputClasses =
  "w-full border-b border-white/20 bg-transparent py-3 text-body text-white placeholder:text-white/40 focus:border-accent focus:outline-none transition-colors";

export function ContactForm({ dict }: { dict: any }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 sm:grid-cols-2" noValidate>
      {/* Honeypot field for spam bots */}
      <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
        <label htmlFor="honeypot">Don&apos;t fill this out if you&apos;re human:</label>
        <input id="honeypot" {...register("honeypot")} tabIndex={-1} autoComplete="off" />
      </div>
      <div className="sm:col-span-1">
        <label htmlFor="name" className="mb-1 block text-small text-white/80">{dict.name}</label>
        <input id="name" {...register("name")} className={inputClasses} />
        {errors.name && <p className="mt-1 text-small text-error">{errors.name.message as string}</p>}
      </div>

      <div className="sm:col-span-1">
        <label htmlFor="email" className="mb-1 block text-small text-white/80">{dict.email}</label>
        <input id="email" type="email" {...register("email")} className={inputClasses} />
        {errors.email && <p className="mt-1 text-small text-error">{errors.email.message as string}</p>}
      </div>

      <div className="sm:col-span-1">
        <label htmlFor="company" className="mb-1 block text-small text-white/80">{dict.company}</label>
        <input id="company" {...register("company")} className={inputClasses} />
      </div>

      <div className="sm:col-span-1">
        <label htmlFor="projectType" className="mb-1 block text-small text-white/80">{dict.projectType}</label>
        <select id="projectType" {...register("projectType")} className={inputClasses}>
          <option value="" className="bg-black text-white">{dict.selectOne}</option>
          <option value="product-visualization" className="bg-black text-white">{dict.productVisualization}</option>
          <option value="product-animation" className="bg-black text-white">{dict.productAnimation}</option>
          <option value="motion-design" className="bg-black text-white">{dict.motionDesign}</option>
          <option value="commercial-cgi" className="bg-black text-white">{dict.commercialCGI}</option>
          <option value="other" className="bg-black text-white">{dict.other}</option>
        </select>
        {errors.projectType && <p className="mt-1 text-small text-error">{errors.projectType.message as string}</p>}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="budget" className="mb-1 block text-small text-white/80">{dict.budget}</label>
        <select id="budget" {...register("budget")} className={inputClasses}>
          <option value="" className="bg-black text-white">{dict.selectRange}</option>
          <option value="300-1k" className="bg-black text-white">$300 – $1,000</option>
          <option value="1k-3k" className="bg-black text-white">$1,000 – $3,000</option>
          <option value="3k-plus" className="bg-black text-white">$3,000+</option>
        </select>
        {errors.budget && <p className="mt-1 text-small text-error">{errors.budget.message as string}</p>}
      </div>

      <div className="sm:col-span-2">
        <label className="mb-3 block text-small text-white/80">
          WhatsApp (Optional)
        </label>
        <div className="flex gap-3">
          <select
            id="countryCode"
            {...register("countryCode")}
            className="w-40 border-b border-white/20 bg-transparent py-3 text-body text-white focus:border-accent focus:outline-none transition-colors"
            onKeyDown={(e) => {
              const select = e.currentTarget;
              const options = Array.from(select.options);
              const currentIndex = select.selectedIndex;
              const key = e.key.toLowerCase();

              if (key.length === 1 && key.match(/[a-z]/)) {
                e.preventDefault();
                const startIndex = currentIndex + 1;
                for (let i = startIndex; i < options.length; i++) {
                  if (options[i].text.toLowerCase().startsWith(key)) {
                    select.selectedIndex = i;
                    return;
                  }
                }
                for (let i = 0; i < startIndex; i++) {
                  if (options[i].text.toLowerCase().startsWith(key)) {
                    select.selectedIndex = i;
                    return;
                  }
                }
              }
            }}
          >
            <option value="" className="bg-black text-white">Code</option>
            <option value="+93" className="bg-black text-white">+93 (Afghanistan)</option>
            <option value="+355" className="bg-black text-white">+355 (Albania)</option>
            <option value="+213" className="bg-black text-white">+213 (Algeria)</option>
            <option value="+1" className="bg-black text-white">+1 (American Samoa)</option>
            <option value="+376" className="bg-black text-white">+376 (Andorra)</option>
            <option value="+244" className="bg-black text-white">+244 (Angola)</option>
            <option value="+1" className="bg-black text-white">+1 (Anguilla)</option>
            <option value="+1" className="bg-black text-white">+1 (Antigua)</option>
            <option value="+54" className="bg-black text-white">+54 (Argentina)</option>
            <option value="+374" className="bg-black text-white">+374 (Armenia)</option>
            <option value="+297" className="bg-black text-white">+297 (Aruba)</option>
            <option value="+61" className="bg-black text-white">+61 (Australia)</option>
            <option value="+43" className="bg-black text-white">+43 (Austria)</option>
            <option value="+994" className="bg-black text-white">+994 (Azerbaijan)</option>
            <option value="+1" className="bg-black text-white">+1 (Bahamas)</option>
            <option value="+973" className="bg-black text-white">+973 (Bahrain)</option>
            <option value="+880" className="bg-black text-white">+880 (Bangladesh)</option>
            <option value="+1" className="bg-black text-white">+1 (Barbados)</option>
            <option value="+375" className="bg-black text-white">+375 (Belarus)</option>
            <option value="+32" className="bg-black text-white">+32 (Belgium)</option>
            <option value="+501" className="bg-black text-white">+501 (Belize)</option>
            <option value="+229" className="bg-black text-white">+229 (Benin)</option>
            <option value="+1" className="bg-black text-white">+1 (Bermuda)</option>
            <option value="+975" className="bg-black text-white">+975 (Bhutan)</option>
            <option value="+591" className="bg-black text-white">+591 (Bolivia)</option>
            <option value="+387" className="bg-black text-white">+387 (Bosnia)</option>
            <option value="+267" className="bg-black text-white">+267 (Botswana)</option>
            <option value="+55" className="bg-black text-white">+55 (Brazil)</option>
            <option value="+1" className="bg-black text-white">+1 (British Virgin Is.)</option>
            <option value="+673" className="bg-black text-white">+673 (Brunei)</option>
            <option value="+359" className="bg-black text-white">+359 (Bulgaria)</option>
            <option value="+226" className="bg-black text-white">+226 (Burkina Faso)</option>
            <option value="+257" className="bg-black text-white">+257 (Burundi)</option>
            <option value="+855" className="bg-black text-white">+855 (Cambodia)</option>
            <option value="+237" className="bg-black text-white">+237 (Cameroon)</option>
            <option value="+1" className="bg-black text-white">+1 (Canada)</option>
            <option value="+238" className="bg-black text-white">+238 (Cape Verde)</option>
            <option value="+1" className="bg-black text-white">+1 (Cayman Islands)</option>
            <option value="+236" className="bg-black text-white">+236 (Central African Rep.)</option>
            <option value="+235" className="bg-black text-white">+235 (Chad)</option>
            <option value="+56" className="bg-black text-white">+56 (Chile)</option>
            <option value="+86" className="bg-black text-white">+86 (China)</option>
            <option value="+57" className="bg-black text-white">+57 (Colombia)</option>
            <option value="+269" className="bg-black text-white">+269 (Comoros)</option>
            <option value="+242" className="bg-black text-white">+242 (Congo)</option>
            <option value="+682" className="bg-black text-white">+682 (Cook Islands)</option>
            <option value="+506" className="bg-black text-white">+506 (Costa Rica)</option>
            <option value="+385" className="bg-black text-white">+385 (Croatia)</option>
            <option value="+53" className="bg-black text-white">+53 (Cuba)</option>
            <option value="+599" className="bg-black text-white">+599 (Curaçao)</option>
            <option value="+357" className="bg-black text-white">+357 (Cyprus)</option>
            <option value="+420" className="bg-black text-white">+420 (Czech Republic)</option>
            <option value="+45" className="bg-black text-white">+45 (Denmark)</option>
            <option value="+253" className="bg-black text-white">+253 (Djibouti)</option>
            <option value="+1" className="bg-black text-white">+1 (Dominica)</option>
            <option value="+1" className="bg-black text-white">+1 (Dominican Republic)</option>
            <option value="+593" className="bg-black text-white">+593 (Ecuador)</option>
            <option value="+20" className="bg-black text-white">+20 (Egypt)</option>
            <option value="+503" className="bg-black text-white">+503 (El Salvador)</option>
            <option value="+240" className="bg-black text-white">+240 (Equatorial Guinea)</option>
            <option value="+291" className="bg-black text-white">+291 (Eritrea)</option>
            <option value="+372" className="bg-black text-white">+372 (Estonia)</option>
            <option value="+251" className="bg-black text-white">+251 (Ethiopia)</option>
            <option value="+500" className="bg-black text-white">+500 (Falkland Islands)</option>
            <option value="+298" className="bg-black text-white">+298 (Faroe Islands)</option>
            <option value="+679" className="bg-black text-white">+679 (Fiji)</option>
            <option value="+358" className="bg-black text-white">+358 (Finland)</option>
            <option value="+33" className="bg-black text-white">+33 (France)</option>
            <option value="+594" className="bg-black text-white">+594 (French Guiana)</option>
            <option value="+689" className="bg-black text-white">+689 (French Polynesia)</option>
            <option value="+241" className="bg-black text-white">+241 (Gabon)</option>
            <option value="+220" className="bg-black text-white">+220 (Gambia)</option>
            <option value="+995" className="bg-black text-white">+995 (Georgia)</option>
            <option value="+49" className="bg-black text-white">+49 (Germany)</option>
            <option value="+233" className="bg-black text-white">+233 (Ghana)</option>
            <option value="+350" className="bg-black text-white">+350 (Gibraltar)</option>
            <option value="+30" className="bg-black text-white">+30 (Greece)</option>
            <option value="+299" className="bg-black text-white">+299 (Greenland)</option>
            <option value="+1" className="bg-black text-white">+1 (Grenada)</option>
            <option value="+590" className="bg-black text-white">+590 (Guadeloupe)</option>
            <option value="+1" className="bg-black text-white">+1 (Guam)</option>
            <option value="+502" className="bg-black text-white">+502 (Guatemala)</option>
            <option value="+224" className="bg-black text-white">+224 (Guinea)</option>
            <option value="+245" className="bg-black text-white">+245 (Guinea-Bissau)</option>
            <option value="+592" className="bg-black text-white">+592 (Guyana)</option>
            <option value="+509" className="bg-black text-white">+509 (Haiti)</option>
            <option value="+504" className="bg-black text-white">+504 (Honduras)</option>
            <option value="+852" className="bg-black text-white">+852 (Hong Kong)</option>
            <option value="+36" className="bg-black text-white">+36 (Hungary)</option>
            <option value="+354" className="bg-black text-white">+354 (Iceland)</option>
            <option value="+91" className="bg-black text-white">+91 (India)</option>
            <option value="+62" className="bg-black text-white">+62 (Indonesia)</option>
            <option value="+98" className="bg-black text-white">+98 (Iran)</option>
            <option value="+964" className="bg-black text-white">+964 (Iraq)</option>
            <option value="+353" className="bg-black text-white">+353 (Ireland)</option>
            <option value="+972" className="bg-black text-white">+972 (Israel)</option>
            <option value="+39" className="bg-black text-white">+39 (Italy)</option>
            <option value="+1" className="bg-black text-white">+1 (Jamaica)</option>
            <option value="+81" className="bg-black text-white">+81 (Japan)</option>
            <option value="+962" className="bg-black text-white">+962 (Jordan)</option>
            <option value="+7" className="bg-black text-white">+7 (Kazakhstan)</option>
            <option value="+254" className="bg-black text-white">+254 (Kenya)</option>
            <option value="+686" className="bg-black text-white">+686 (Kiribati)</option>
            <option value="+965" className="bg-black text-white">+965 (Kuwait)</option>
            <option value="+996" className="bg-black text-white">+996 (Kyrgyzstan)</option>
            <option value="+856" className="bg-black text-white">+856 (Laos)</option>
            <option value="+371" className="bg-black text-white">+371 (Latvia)</option>
            <option value="+961" className="bg-black text-white">+961 (Lebanon)</option>
            <option value="+266" className="bg-black text-white">+266 (Lesotho)</option>
            <option value="+231" className="bg-black text-white">+231 (Liberia)</option>
            <option value="+218" className="bg-black text-white">+218 (Libya)</option>
            <option value="+423" className="bg-black text-white">+423 (Liechtenstein)</option>
            <option value="+370" className="bg-black text-white">+370 (Lithuania)</option>
            <option value="+352" className="bg-black text-white">+352 (Luxembourg)</option>
            <option value="+853" className="bg-black text-white">+853 (Macau)</option>
            <option value="+389" className="bg-black text-white">+389 (Macedonia)</option>
            <option value="+261" className="bg-black text-white">+261 (Madagascar)</option>
            <option value="+265" className="bg-black text-white">+265 (Malawi)</option>
            <option value="+60" className="bg-black text-white">+60 (Malaysia)</option>
            <option value="+960" className="bg-black text-white">+960 (Maldives)</option>
            <option value="+223" className="bg-black text-white">+223 (Mali)</option>
            <option value="+356" className="bg-black text-white">+356 (Malta)</option>
            <option value="+692" className="bg-black text-white">+692 (Marshall Islands)</option>
            <option value="+596" className="bg-black text-white">+596 (Martinique)</option>
            <option value="+222" className="bg-black text-white">+222 (Mauritania)</option>
            <option value="+230" className="bg-black text-white">+230 (Mauritius)</option>
            <option value="+52" className="bg-black text-white">+52 (Mexico)</option>
            <option value="+691" className="bg-black text-white">+691 (Micronesia)</option>
            <option value="+373" className="bg-black text-white">+373 (Moldova)</option>
            <option value="+377" className="bg-black text-white">+377 (Monaco)</option>
            <option value="+976" className="bg-black text-white">+976 (Mongolia)</option>
            <option value="+382" className="bg-black text-white">+382 (Montenegro)</option>
            <option value="+1" className="bg-black text-white">+1 (Montserrat)</option>
            <option value="+212" className="bg-black text-white">+212 (Morocco)</option>
            <option value="+258" className="bg-black text-white">+258 (Mozambique)</option>
            <option value="+95" className="bg-black text-white">+95 (Myanmar)</option>
            <option value="+264" className="bg-black text-white">+264 (Namibia)</option>
            <option value="+674" className="bg-black text-white">+674 (Nauru)</option>
            <option value="+977" className="bg-black text-white">+977 (Nepal)</option>
            <option value="+31" className="bg-black text-white">+31 (Netherlands)</option>
            <option value="+687" className="bg-black text-white">+687 (New Caledonia)</option>
            <option value="+64" className="bg-black text-white">+64 (New Zealand)</option>
            <option value="+505" className="bg-black text-white">+505 (Nicaragua)</option>
            <option value="+227" className="bg-black text-white">+227 (Niger)</option>
            <option value="+234" className="bg-black text-white">+234 (Nigeria)</option>
            <option value="+683" className="bg-black text-white">+683 (Niue)</option>
            <option value="+1" className="bg-black text-white">+1 (Northern Mariana Is.)</option>
            <option value="+47" className="bg-black text-white">+47 (Norway)</option>
            <option value="+968" className="bg-black text-white">+968 (Oman)</option>
            <option value="+92" className="bg-black text-white">+92 (Pakistan)</option>
            <option value="+680" className="bg-black text-white">+680 (Palau)</option>
            <option value="+507" className="bg-black text-white">+507 (Panama)</option>
            <option value="+675" className="bg-black text-white">+675 (Papua New Guinea)</option>
            <option value="+595" className="bg-black text-white">+595 (Paraguay)</option>
            <option value="+51" className="bg-black text-white">+51 (Peru)</option>
            <option value="+63" className="bg-black text-white">+63 (Philippines)</option>
            <option value="+48" className="bg-black text-white">+48 (Poland)</option>
            <option value="+351" className="bg-black text-white">+351 (Portugal)</option>
            <option value="+1" className="bg-black text-white">+1 (Puerto Rico)</option>
            <option value="+974" className="bg-black text-white">+974 (Qatar)</option>
            <option value="+40" className="bg-black text-white">+40 (Romania)</option>
            <option value="+7" className="bg-black text-white">+7 (Russia)</option>
            <option value="+250" className="bg-black text-white">+250 (Rwanda)</option>
            <option value="+1" className="bg-black text-white">+1 (Saint Kitts)</option>
            <option value="+1" className="bg-black text-white">+1 (Saint Lucia)</option>
            <option value="+1" className="bg-black text-white">+1 (Saint Vincent)</option>
            <option value="+685" className="bg-black text-white">+685 (Samoa)</option>
            <option value="+378" className="bg-black text-white">+378 (San Marino)</option>
            <option value="+239" className="bg-black text-white">+239 (Sao Tome)</option>
            <option value="+966" className="bg-black text-white">+966 (Saudi Arabia)</option>
            <option value="+221" className="bg-black text-white">+221 (Senegal)</option>
            <option value="+381" className="bg-black text-white">+381 (Serbia)</option>
            <option value="+248" className="bg-black text-white">+248 (Seychelles)</option>
            <option value="+232" className="bg-black text-white">+232 (Sierra Leone)</option>
            <option value="+65" className="bg-black text-white">+65 (Singapore)</option>
            <option value="+421" className="bg-black text-white">+421 (Slovakia)</option>
            <option value="+386" className="bg-black text-white">+386 (Slovenia)</option>
            <option value="+677" className="bg-black text-white">+677 (Solomon Islands)</option>
            <option value="+252" className="bg-black text-white">+252 (Somalia)</option>
            <option value="+27" className="bg-black text-white">+27 (South Africa)</option>
            <option value="+82" className="bg-black text-white">+82 (South Korea)</option>
            <option value="+34" className="bg-black text-white">+34 (Spain)</option>
            <option value="+94" className="bg-black text-white">+94 (Sri Lanka)</option>
            <option value="+249" className="bg-black text-white">+249 (Sudan)</option>
            <option value="+597" className="bg-black text-white">+597 (Suriname)</option>
            <option value="+46" className="bg-black text-white">+46 (Sweden)</option>
            <option value="+41" className="bg-black text-white">+41 (Switzerland)</option>
            <option value="+963" className="bg-black text-white">+963 (Syria)</option>
            <option value="+886" className="bg-black text-white">+886 (Taiwan)</option>
            <option value="+992" className="bg-black text-white">+992 (Tajikistan)</option>
            <option value="+255" className="bg-black text-white">+255 (Tanzania)</option>
            <option value="+66" className="bg-black text-white">+66 (Thailand)</option>
            <option value="+228" className="bg-black text-white">+228 (Togo)</option>
            <option value="+690" className="bg-black text-white">+690 (Tokelau)</option>
            <option value="+676" className="bg-black text-white">+676 (Tonga)</option>
            <option value="+1" className="bg-black text-white">+1 (Trinidad)</option>
            <option value="+216" className="bg-black text-white">+216 (Tunisia)</option>
            <option value="+90" className="bg-black text-white">+90 (Turkey)</option>
            <option value="+993" className="bg-black text-white">+993 (Turkmenistan)</option>
            <option value="+1" className="bg-black text-white">+1 (Turks & Caicos)</option>
            <option value="+688" className="bg-black text-white">+688 (Tuvalu)</option>
            <option value="+256" className="bg-black text-white">+256 (Uganda)</option>
            <option value="+380" className="bg-black text-white">+380 (Ukraine)</option>
            <option value="+971" className="bg-black text-white">+971 (UAE)</option>
            <option value="+44" className="bg-black text-white">+44 (UK)</option>
            <option value="+1" className="bg-black text-white">+1 (USA)</option>
            <option value="+598" className="bg-black text-white">+598 (Uruguay)</option>
            <option value="+998" className="bg-black text-white">+998 (Uzbekistan)</option>
            <option value="+678" className="bg-black text-white">+678 (Vanuatu)</option>
            <option value="+379" className="bg-black text-white">+379 (Vatican City)</option>
            <option value="+58" className="bg-black text-white">+58 (Venezuela)</option>
            <option value="+84" className="bg-black text-white">+84 (Vietnam)</option>
            <option value="+1" className="bg-black text-white">+1 (Virgin Islands)</option>
            <option value="+967" className="bg-black text-white">+967 (Yemen)</option>
            <option value="+260" className="bg-black text-white">+260 (Zambia)</option>
            <option value="+263" className="bg-black text-white">+263 (Zimbabwe)</option>
          </select>
          <input
            id="phoneNumber"
            type="tel"
            placeholder="Phone number"
            {...register("phoneNumber")}
            className="flex-1 border-b border-white/20 bg-transparent py-3 text-body text-white placeholder:text-white/40 focus:border-accent focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-1 block text-small text-white/80">{dict.message}</label>
        <textarea id="message" rows={4} {...register("message")} className={inputClasses} />
        {errors.message && <p className="mt-1 text-small text-error">{errors.message.message as string}</p>}
      </div>

      <div className="sm:col-span-2 flex items-center gap-6 pt-2">
        <Button type="submit">{isSubmitting ? dict.sending : dict.submit}</Button>
        {status === "success" && (
          <div className="flex-1 bg-success/10 border border-success/30 rounded-lg p-4">
            <p className="text-small text-success font-medium">Good call you are in good hands Wewill reply as soon as possible</p>
          </div>
        )}
        {status === "error" && (
          <p className="text-small text-error">{dict.error}</p>
        )}
      </div>
    </form>
  );
}
