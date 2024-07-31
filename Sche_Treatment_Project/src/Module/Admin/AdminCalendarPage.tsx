import { CalendarManager } from "../../Component/AdminCalendar";
import { ModalProvider } from "../../hooks/ModalProvider";

export function AdminCalendarPage() {
  return (
    <>
      <ModalProvider>
        <CalendarManager />
      </ModalProvider>
    </>
  );
}
