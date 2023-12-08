"use client";
import { UpdateUserAction } from "@/app/action";
import { IUser, IPagin } from "@/utils/interface";
import { Button, Modal, PaginationProps } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { usePathname, useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

const TableUser: React.FC<{ data: IUser[]; pagin: IPagin }> = ({
    data,
    pagin,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [userUpdate, setUserUpdate] = useState<IUser>({});

    const { replace } = useRouter();
    const pathname = usePathname();

    const columns: ColumnsType<IUser> = [
        {
            title: "User Name",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
        },
        {
            title: "Action",
            key: "action",
            render(value, record, index) {
                return (
                    <Button
                        type="primary"
                        key={1}
                        onClick={() => {
                            setIsOpen(true);
                            setUserUpdate(record);
                        }}
                    >
                        Chinh Sua
                    </Button>
                );
            },
        },
    ];

    const handleChange = (data: PaginationProps) => {
        const params = new URLSearchParams();
        params.set("_page", String(data.current ?? 1));
        params.set("_limit", String(pagin.limit));
        replace(`${pathname}?${params}`);
    };

    return (
        <div>
            <Modal
                title="Basic Modal"
                open={isOpen}
                onCancel={() => {
                    setIsOpen(false);
                }}
                footer={null}
            >
                <form
                    action={() => {
                        UpdateUserAction(userUpdate);
                        setIsOpen(false);
                    }}
                >
                    <input name="id" defaultValue={userUpdate?.id} hidden />
                    <input
                        name="username"
                        defaultValue={userUpdate?.username}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setUserUpdate((prev) => ({
                                ...prev,
                                username: e.target.value,
                            }));
                        }}
                    />
                    <input
                        name="avatar"
                        defaultValue={userUpdate?.avatar}
                        onChange={(e) => {
                            setUserUpdate((prev) => ({
                                ...prev,
                                avatar: e.target.value,
                            }));
                        }}
                    />
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </form>
            </Modal>
            <Table
                rowKey={"id"}
                dataSource={data}
                columns={columns}
                pagination={{
                    total: pagin.totalCount,
                    pageSize: pagin.limit,
                    defaultCurrent: 1,
                }}
                onChange={handleChange}
            />
        </div>
    );
};

export default TableUser;
