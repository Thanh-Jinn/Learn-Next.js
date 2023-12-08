import TableUser from "@/components/TableUser/TableUser";
import { IPagin, IUser } from "@/utils/interface";

export default async function HomePage(props: {
    params: {};
    searchParams: {
        page: number;
        pageSize: number;
    };
}) {
    const res = await fetch(
        `http://localhost:5000/user?_page=${props.searchParams.page}&_limit=${props.searchParams.pageSize}`,
        {
            next: {
                tags: ["user-list"],
            },
        }
    );
    const meta: IPagin = {
        limit: 1,
        totalCount: (res.headers.get("x-total-count") ?? 0) as number,
    };
    const data: IUser[] | [] = await res.json();
    return (
        <div>
            <TableUser data={data} pagin={meta} />
        </div>
    );
}
