'use client';

import {
  FormEventHandler,
  HTMLInputTypeAttribute,
  MouseEventHandler,
  useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import useClickOutside from '@/hooks/useClickOutside'

export interface AutocompleteCandidate {
  label: string,
  icon?: IconDefinition
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export interface AutocompleteProps {
  id?: string;
  type?: HTMLInputTypeAttribute,
  placeholder?: string,
  candidateList?: AutocompleteCandidate[],
  onClick?: MouseEventHandler<HTMLInputElement>
  onInput?: FormEventHandler<HTMLInputElement>
  className?: string
}

export default function Autocomplete({
  id = '',
  type = 'text',
  placeholder = '',
  candidateList = [],
  className = '',
}: AutocompleteProps) {
  const [isOpen, setOpen] = useState<boolean>(false)

  const handleInputTextfield = () => {
    setOpen(true);
  };

  const handleClickOutsideCandidateList = () => {
    setOpen(false);
  };

  const candidateListRef = useClickOutside(handleClickOutsideCandidateList);

  return (
    <div className='relative'>
      <input
        id={id}
        className={[
          'h-[2.5rem]', 'w-full',
          'px-4',
          'text-sm',
          'rounded-3xl',
          'bg-white', 'dark:bg-black',
          'border-2', 'border-slate-200', 'dark:border-slate-800',
          'focus:outline-none', 'focus:ring-0', 'focus:border-purple-400', 'dark:focus:border-purple-400',
          className
        ].join(' ')}
        type={type}
        placeholder={placeholder}
        onInput={handleInputTextfield}
      ></input>
      {isOpen && (
        <div
          className={[
            'absolute', 'top-full', 'left-0', 'right-0',
            'z-50',
          ].join(' ')}
          ref={candidateListRef}
        >
          <div
          className={[
            'w-full',
            'mt-2', 'px2',
            'rounded-3xl',
            'bg-white', 'dark:bg-black',
            'border-2', 'border-purple-400', 'dark:border-purple-400',
            'focus:outline-none', 'focus:ring-0', 'focus:border-purple-400', 'dark:focus:border-purple-400',
          ].join(' ')}
          >
            <ol
              className={[
                'bg-white', 'dark:bg-black',
                'rounded-3xl',
                'divide-y', 'divide-slate-200', 'dark:divide-slate-800', 'divide-dashed',
              ].join(' ')}
            >
              {candidateList.length > 0 && candidateList.map((candidate, index) => (
                <li
                  key={index}
                  className={[
                    'px-4', 'py-2',
                    'bg-white', 'dark:bg-black', 'hover:bg-slate-50', 'dark:hover:bg-black',
                    // 'odd:bg-white', 'even:bg-slate-50',
                    'rounded-3xl',
                  ].join(' ')}
                >
                  <button
                    className={[
                      'flex', 'justify-start', 'items-start',
                      'w-full',
                    ].join(' ')}
                    onClick={candidate.onClick}
                  >
                    {candidate.icon && (
                      <FontAwesomeIcon
                        className={[
                          'h-5', 'w-5',
                          'mr-3', 'py-[0.1rem]',
                          'text-lg',
                        ].join(' ')}
                        icon={candidate.icon}
                      />
                    )}
                    <div
                      className={[
                        'flex', 'flex-col', 'justify-start', 'items-start',
                        'grow',
                      ].join(' ')}
                    >
                      <div>{candidate.label}</div>
                    </div>
                  </button>
                </li>
              ))}
              {candidateList.length <= 0 && (
                <div 
                  className={[
                    'flex', 'justify-center', 'items-center',
                    'h-10',
                  ].join(' ')}
                >
                  <span className={[
                    'text-slate-500', 'dark:text-slate-500',
                  ].join(' ')}>검색 결과가 없습니다.</span>
                </div>
              )}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
