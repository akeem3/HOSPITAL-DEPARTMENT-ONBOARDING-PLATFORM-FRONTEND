import { AdminUsers } from "@/components/admin/admin-users";

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Users</h1>
        <p className="text-muted-foreground">
          Manage admin users who can access the admin dashboard.
        </p>
      </div>
      <AdminUsers />
    </div>
  );
}
