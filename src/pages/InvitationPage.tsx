import { useParams } from "react-router-dom";
import { InvitationHero } from "../components/invitation/InvitationHero";
import { EventSection } from "../components/invitation/EventSection";
import { RSVPSection } from "../components/invitation/RSVPSection";
import { InvitationFooter } from "../components/invitation/InvitationFooter";

export function InvitationPage() {
  const { token } = useParams<{ token: string }>();

  return (
    <main>
      <InvitationHero />
      <EventSection />
      <RSVPSection />
      <InvitationFooter />
    </main>
  );
}
