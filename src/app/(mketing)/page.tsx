import TableUser from "@/components/TableUser/TableUser";
import { IPagin, IUser } from "@/utils/interface";

export default async function HomePage() {
    const res = await fetch("http://localhost:5000/user", {
        next: {
            tags: ["user-list"],
        },
    });
    const data: IUser[] | [] = await res.json();
    return (
        <div>
            <HeaderHome />
            {/* <TableUser data={data} /> */}
        </div>
    );
}
