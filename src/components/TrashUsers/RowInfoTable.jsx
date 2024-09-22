import { IconCircleCheck, IconForbid, IconRestore, IconEye } from '@tabler/icons-react';
import { Avatar, Badge, Group, Table, Text } from '@mantine/core';
import { IconTrashX } from '@tabler/icons-react';
import { userService } from '@/services';
import { toastShow } from '@/helpers';
import swal from "sweetalert";

const UserRow = ({ sortedData, uList, setUserInfo, open,refreshUsers}) => {

    const onTrashCall = async (user) => {
        swal({
            content: {
                element: "div",
                attributes: {
                    innerHTML: `
                <h3 style="text-align: center;color: #fff;">Are you sure you want to untrash this user?</h3>
              `,
                },
            },
            dangerMode: true,
            buttons: true,
            className: "buy-car-model",
        })
            .then(async (willBuy) => {
                if (willBuy) {
                    const res = await userService.updateTrash(user.id)
                    if (res) {
                        toastShow(res.message)
                        refreshUsers()
                    }
                }
            });
    }
    const deleteUser = async (user) => {
        swal({
            content: {
                element: "div",
                attributes: {
                    innerHTML: `
                <h3 style="text-align: center;color: #fff;">Are you sure you want to delete this User?</h3>
              `,
                },
            },
            dangerMode: true,
            buttons: true,
            className: "buy-car-model",
        })
            .then(async (willBuy) => {
                if (willBuy) {
                    const res = await userService.delete(user.id)
                    if (res) {
                        toastShow("User deleted successfully")
                        refreshUsers()
                    }
                }
            });
    }
    const handleClick = (user) => {
        const item = uList.filter((item) => item.id === user.id)[0];
        setUserInfo(item);
        open();
    };

    return (
        <>
            {sortedData.map((user) => (
                <Table.Tr key={user.id} style={{ cursor: "pointer" }}>
                    <Table.Td>
                        {user.sr}
                    </Table.Td>
                    <Table.Td>
                        {user.id}
                    </Table.Td>
                    <Table.Td>
                        <Group gap="sm" style={{ display: "flex", flexWrap: "nowrap" }}>
                            <Text size="sm" fw={500} style={{ textOverflow: "ellipsis", textWrap: "nowrap", overflow: "hidden" }}>
                                {user.name}
                            </Text>
                        </Group>
                    </Table.Td>
                    <Table.Td style={{ wordWrap: 'break-word' }}>{user.email}</Table.Td>
                    <Table.Td style={{ wordWrap: 'break-word' }}>{user.packageMode}</Table.Td>
                    <Table.Td style={{ wordWrap: 'break-word' }}>{user?.referal ?user?.referal: ''}</Table.Td>
                    <Table.Td>
                        {user.status == 'APPROVED' ?
                            <Badge py="sm" leftSection={<IconCircleCheck />} >{user.status}</Badge> :
                            <Badge py="sm" leftSection={<IconForbid />} bg={user.status == 'PENDING' ? "yellow" : "red"}>{user.status}</Badge>}
                    </Table.Td>
                    <Table.Td style={{ color: 'red' }}>
                        <IconRestore onClick={() => onTrashCall(user)} />
                    </Table.Td>
                    <Table.Td style={{ color: 'red' }}>
                        <IconTrashX onClick={() => deleteUser(user)} />
                    </Table.Td>
                    <Table.Td>
                        <IconEye onClick={() => handleClick(user)} />
                    </Table.Td>
                </Table.Tr>
            ))
            }
        </>
    );
};

export default UserRow;