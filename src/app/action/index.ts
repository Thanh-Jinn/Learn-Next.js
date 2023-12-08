"use server";

import { IUser } from "@/utils/interface";
import { revalidateTag } from "next/cache";

export async function UpdateUserAction(data: IUser) {
    console.log(data)
    const res = await fetch(`http://localhost:5000/user/${data.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: data.username,
            avatar: data.avatar,
            id: data.id,
        }),
    });
    revalidateTag("users_list");
    return res.json();
}
