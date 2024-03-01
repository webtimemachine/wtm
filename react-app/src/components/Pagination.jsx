import React from 'react';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'

const Pagination = ({ currentPage, totalPages, paginate }) => {

    const pageNumbers = Array.from({length: totalPages}, (_, i) => i + 1);
  
  return (

    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
        <div className="-mt-px flex w-0 flex-1">
            <a
                href="#"
                className={(currentPage === 1 ? 'hidden' : '') + " inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"}
                onClick={(e) => {e.preventDefault();paginate(currentPage-1)}}
            >
                <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                Previous
            </a>
        </div>
        <div className=" md:-mt-px md:flex">
            {pageNumbers.map(number => (
                <a
                    key={number}
                    href="#"
                    className={`inline-flex items-center border-t-2 ${number === currentPage ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} px-4 pt-4 text-sm font-medium`}
                    onClick={(e) => {e.preventDefault();paginate(number)}}
                >
                    {number}
                </a>
            ))}
        </div>
        <div className="-mt-px flex w-0 flex-1 justify-end">
            <a
                href="#"
                className={(totalPages <= currentPage ? 'hidden' : '') + " inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"}
                onClick={(e) => {e.preventDefault();paginate(currentPage+1)}}
            >
                Next
                <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            </a>
        </div>
    </nav>

  );
};

export default Pagination;