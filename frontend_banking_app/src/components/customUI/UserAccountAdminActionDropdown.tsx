import React from 'react';
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {EllipsisVerticalIcon, EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";
import {SimpleAccountDetails} from "../../types/Types";
import useAdminContext from "../../hooks/contextHook/useAdminContext";

interface UserAccountAdminActionDropdownProps {
  account: SimpleAccountDetails
}

const UserAccountAdminActionDropdown = ({account}: UserAccountAdminActionDropdownProps) => {
  const { handleDeactivateAccount, handleActivateAccount } = useAdminContext();
  return (
    <Menu>
      <MenuButton>
        <EllipsisVerticalIcon className={"icon"} />
      </MenuButton>
      <MenuItems className={"w-auto rounded-md shadow-lg ring-1 ring-black ring-opacity-5 bg-white z-50"} anchor={"bottom start"}>
        {account.active ? (
          <MenuItem>
            <a
              className={'block px-4 py-2 text-sm font-normal hover:bg-gray-100 cursor-pointer'}
              onClick={() => handleDeactivateAccount(account.id)}
            >
              <div className={"flex gap-2"}>
                <EyeSlashIcon className={"icon text-red-500"}/>
                <p className={"text-red-500"}>Deactivate Account</p>
              </div>
            </a>
          </MenuItem>) : (
          <MenuItem>
            <a
            className={'block px-4 py-2 text-sm font-normal hover:bg-gray-100 cursor-pointer'}
            onClick={() => handleActivateAccount(account.id)}
            >
              <div className={"flex gap-2"}>
                <EyeIcon className={"icon text-gray-900"}/>
                <p>Activate Account</p>
              </div>
            </a>
          </MenuItem>
          )}
      </MenuItems>
    </Menu>
  );
};

export default UserAccountAdminActionDropdown;