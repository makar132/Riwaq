import { NavLink } from "react-router-dom";
import { FiBookOpen, FiTag, FiCheckCircle, FiClock } from "react-icons/fi";
import PageHeader from "../../components/admin/PageHeader";
import { useCoursesCount, useCoursesPublishedCount, useCategoriesCount } from "../../hooks/useCounts";
import { useCoursesSorted } from "../../hooks/useCoursesSorted";

export default function AdminDashboard() {
  const { data: totalCourses = 0 } = useCoursesCount();
  const { data: publishedCourses = 0 } = useCoursesPublishedCount();
  const { data: totalCategories = 0 } = useCategoriesCount();
  const drafts = Math.max(0, totalCourses - publishedCourses);

  const { data: recent = [], isLoading: loadingRecent } = useCoursesSorted({
    sortBy: "createdAt",
    dir: "desc",
    qText: "",
    status: "all",
  });
  const recent5 = (recent || []).slice(0, 5);

  return (
    <>
      <PageHeader title="Overview" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Courses" value={totalCourses} icon={<FiBookOpen className="text-[#2F7E80]" />} link={{ to: "/admin/courses", label: "Manage" }} />
        <StatCard title="Published" value={publishedCourses} icon={<FiCheckCircle className="text-emerald-600" />} link={{ to: "/admin/courses?filter=published", label: "View" }} />
        <StatCard title="Drafts" value={drafts} icon={<FiClock className="text-amber-600" />} link={{ to: "/admin/courses?filter=drafts", label: "Review" }} />
        <StatCard title="Categories" value={totalCategories} icon={<FiTag className="text-[#49BBBD]" />} link={{ to: "/admin/categories", label: "Manage" }} />
      </div>

      <section className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Recent Courses</h2>
          <NavLink to="/admin/courses" className="text-sm font-medium text-[#2F7E80] hover:underline">
            See all →
          </NavLink>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          {loadingRecent ? <RecentSkeleton /> : recent5.length === 0 ? (
            <div className="p-6 text-sm text-gray-600">No courses yet.</div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {recent5.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-gray-900">{c.title}</div>
                    <div className="text-xs text-gray-500">{formatDate(c.createdAt)}</div>
                  </div>
                  <NavLink to={`/admin/courses/${c.id}/edit`} className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50">
                    Edit
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

function StatCard({ title, value, icon, link }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-xl">{icon}</div>
      </div>
      <div className="mt-1 text-3xl font-bold text-gray-900">{value}</div>
      {link && (
        <NavLink to={link.to} className="mt-3 inline-block text-sm font-semibold text-[#49BBBD] hover:text-[#2F7E80]">
          {link.label} →
        </NavLink>
      )}
    </div>
  );
}

function RecentSkeleton() {
  return <ul>{Array.from({ length: 5 }).map((_, i) => (<li key={i} className="h-12 animate-pulse border-b border-gray-100" />))}</ul>;
}
function formatDate(ts) {
  if (!ts) return "—";
  const ms = ts.toMillis ? ts.toMillis() : (ts.seconds ? ts.seconds * 1000 : +new Date(ts));
  return new Date(ms).toLocaleDateString();
}
