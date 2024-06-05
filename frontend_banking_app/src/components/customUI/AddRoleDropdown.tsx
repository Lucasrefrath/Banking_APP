import React, {ReactElement} from 'react';
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {PlusIcon} from "@heroicons/react/24/outline";
import {Roles} from "../../types/Enums";
import {CheckBadgeIcon, StarIcon, UsersIcon} from "@heroicons/react/24/solid";

interface AddRoleDropdownProps {
  userRoles: Roles[],
  addRole: (role: Roles) => void
}

const AddRoleDropdown = ({ userRoles, addRole }: AddRoleDropdownProps) => {
  const avaRoles: Roles[] = Object.values(Roles).filter((role) => !userRoles.includes(role));

  const getRoleItem = (role: Roles): ReactElement => {
    switch (role) {
      case Roles.ADMIN: return <CheckBadgeIcon className={"text-red-600 icon-small"} key={role.toLowerCase()}/>
      case Roles.VIP: return <StarIcon className={"text-yellow-500 icon-small"} key={role.toLowerCase()} />
      case Roles.USER: return <UsersIcon className={"text-indigo-600 icon-small"} key={role.toLowerCase()}/>
    }
  }

  const formattedRole = (role: Roles): string => {
    return role.split("_")[1];
  }

  if(avaRoles.length === 0) {
    return <></>
  }

  return (
    <Menu>
      <MenuButton className={"pill-round-gray"}>
        <PlusIcon className={"icon-small"} />
      </MenuButton>

      <MenuItems className={"menu-items"} anchor={"bottom start"}>
        {avaRoles.map((role) => (
          <MenuItem>
            <a
              className={"type-menu-item"}
              onClick={() => addRole(role)}
            >
              <div className={"flex gap-1 items-center"}>
                <div>{getRoleItem(role)}</div>
                <div>{formattedRole(role)}</div>
              </div>
            </a>
          </MenuItem>
        ))}

      </MenuItems>

    </Menu>
  );
};

export default AddRoleDropdown;