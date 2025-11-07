import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
    title: "Zillion - Admin",
    description: "Zillion - Admin",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <AdminLayout>
                {children}
            </AdminLayout>
        </>
    );
}
