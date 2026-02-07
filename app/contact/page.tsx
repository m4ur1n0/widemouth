import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_CONTACT_QUERY } from "@/sanity/lib/queries";
import { uiIndie as ui } from "../ui/classes";
import ContactForm from "../components/contact/ContactForm";
import { SocialIcon, Substack, Mail, Link, Instagram, Spotify } from "../components/shared/SocialIcons";

export default async function ContactPage() {
  const settings = await sanityFetch({
    query: SITE_SETTINGS_CONTACT_QUERY,
    revalidate: 3600,
  });

  return (
    <div className={ui.page}>
      <main className={`${ui.section}`}>
        <div className={`${ui.container} ${ui.stack}`}>
          <header className="">
            <div className={ui.label}>Get in touch</div>
            <h1 className={`${ui.h1} mt-2`}>CONTACT</h1>
            <div className={`mt-6 ${ui.rule}`} />
          </header>

          <div className="space-y-8">
            <p className={`${ui.body} max-w-2xl`}>
              Have a question, booking inquiry, or just want to say hi? Drop us a message
              and we&apos;ll get back to you as soon as we can.
            </p>

            <ContactForm />

            {/* Social links */}
            <div className="pt-8">
              <div className={`${ui.label} mb-4`}>Or find us here</div>
              <div className="flex gap-4">
                {settings?.substackLink && (
                  <SocialIcon href={settings.substackLink} label="Substack">
                    <Substack />
                  </SocialIcon>
                )}
                <SocialIcon href="https://instagram.com" label="Instagram">
                  <Instagram />
                </SocialIcon>
                <SocialIcon href="mailto:band@email.com" label="Email">
                  <Mail />
                </SocialIcon>
                <SocialIcon href="https://linktr.ee" label="Links">
                  <Link />
                </SocialIcon>
                <SocialIcon href="https://spotify.com" label="Spotify">
                  <Spotify />
                </SocialIcon>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
