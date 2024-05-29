import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import React, {useEffect, useState} from 'react'
import useAccountSearch from "../hooks/request/useAccountSearch";
import { AccountSearchResultAccountObject } from "../types/Types";
import {CheckIcon, UserCircleIcon} from "@heroicons/react/24/outline";
import useAuthContext from "../hooks/contextHook/useAuthContext";

const AccountSearchBar = ({changeData}: {changeData: (prop: string, value: any) => void}) => {
  const AuthData = useAuthContext()
  const [query, setQuery] = useState<string>('')
  const [selected, setSelected] = useState<AccountSearchResultAccountObject | undefined>(undefined)
  const { results } = useAccountSearch(query);

  useEffect(() => {
    if(selected?.iban !== query) setSelected(undefined);

    if(!selected && results) {
      results.response.forEach((account) => account.iban === query && setSelected(account))
    }
  }, [query]);

  useEffect(() => {
    if(selected) changeData("recipient", selected.accountId)
    else changeData("recipient", undefined)
  }, [ selected ]);

  const show = () => {
    return query
  }

  return (
    <div className="">
      <Combobox value={selected?.iban} onChange={(value: AccountSearchResultAccountObject) => {
        setQuery(value?.iban || "");
        setSelected(value || undefined);
      }}>
        <div className="relative">
          <ComboboxInput
            className={'w-full rounded-lg border-none bg-gray-300 py-1.5 pr-8 pl-3 text-sm/6 text-gray-900 placeholder:text-gray-400'}
            value={show()}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={"search for IBAN or username"}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 fill-gray-400 group-data-[hover]:fill-gray-900" />
          </ComboboxButton>
        </div>
        <ComboboxOptions
          anchor="bottom"
          className="w-[var(--input-width)] rounded-xl border border-gray-400 bg-gray-300 p-1 [--anchor-gap:var(--spacing-1)] empty:hidden z-50 backdrop-blur-sm"
        >
          {results !== undefined && results.response.length !== 0 ? (results.response.map((result: AccountSearchResultAccountObject) => (
            <ComboboxOption
              key={result.iban}
              value={result}
              onClick={() => {
                setSelected(result)
                setQuery(result.iban)
              }}
              className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 backdrop-blur-sm"
            >
              <div className="flex justify-start items-center gap-2 text-gray-900">
                {result.iban === selected?.iban && <CheckIcon className={"h-4 w-4"}/>}
                {result.ownerName === AuthData?.userDetails?.username && <UserCircleIcon className={"h-4 w-4"}/>}
                <p className={"text-sm"}>{result.iban}</p>
                <p className={"text-sm font-light"}>{result.ownerName}</p>
              </div>
            </ComboboxOption>
          ))) : (
            <p className={"font-light text-sm ms-2 text-gray-400"}>no results</p>
          )}
        </ComboboxOptions>
      </Combobox>
    </div>
  )
};

export default AccountSearchBar;
