import { db } from "@/lib/db";
import { toggleInquiryRead, deleteInquiry } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { formatDate } from "@/lib/utils";

export default async function InquiriesAdmin() {
  const inquiries = await db.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand">Inquiries</h1>
        <p className="text-sm text-muted-foreground">
          Messages submitted through the contact form.
        </p>
      </div>

      {inquiries.length > 0 ? (
        <div className="space-y-3">
          {inquiries.map((i) => (
            <div
              key={i.id}
              className={
                "rounded-2xl border bg-background p-5 shadow-sm " +
                (i.read ? "" : "border-l-4 border-l-accent")
              }
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{i.name}</span>
                    {!i.read && (
                      <span className="rounded-full bg-accent/20 px-2 py-0.5 text-xs font-medium text-brand-dark">
                        New
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <a
                      href={`mailto:${i.email}`}
                      className="text-accent hover:underline"
                    >
                      {i.email}
                    </a>
                    {i.phone && <span> · {i.phone}</span>}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatDate(i.createdAt)}
                </div>
              </div>

              {i.subject && (
                <div className="mt-3 text-sm font-medium">{i.subject}</div>
              )}
              <p className="mt-1 whitespace-pre-wrap text-sm text-foreground/90">
                {i.message}
              </p>

              <div className="mt-4 flex items-center gap-2">
                <form action={toggleInquiryRead}>
                  <input type="hidden" name="id" value={i.id} />
                  <input
                    type="hidden"
                    name="read"
                    value={i.read ? "false" : "true"}
                  />
                  <button
                    type="submit"
                    className="rounded-lg border px-3 py-1.5 text-sm font-medium transition hover:bg-muted"
                  >
                    {i.read ? "Mark as unread" : "Mark as read"}
                  </button>
                </form>
                <a
                  href={`mailto:${i.email}?subject=Re: ${encodeURIComponent(
                    i.subject || "Your enquiry",
                  )}`}
                  className="rounded-lg border px-3 py-1.5 text-sm font-medium transition hover:bg-muted"
                >
                  Reply
                </a>
                <DeleteButton
                  action={deleteInquiry}
                  id={i.id}
                  confirm="Delete this inquiry?"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <p className="text-muted-foreground">No inquiries yet.</p>
        </div>
      )}
    </div>
  );
}
