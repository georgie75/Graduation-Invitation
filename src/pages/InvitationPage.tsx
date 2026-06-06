import { useParams } from "react-router-dom";
import { InvitationHero } from "../components/invitation/InvitationHero";
import { ParentsSection } from "../components/invitation/ParentsSection";
import { EventSection } from "../components/invitation/EventSection";
import { RSVPSection } from "../components/invitation/RSVPSection";
import { InvitationFooter } from "../components/invitation/InvitationFooter";

export function InvitationPage() {
  const { invite_slug } = useParams<{ invite_slug: string }>();

  return (
    <main>
      <InvitationHero />
      <ParentsSection />
      <EventSection />
      <RSVPSection inviteSlug={invite_slug!} />
      <InvitationFooter />
    </main>
  );
}
