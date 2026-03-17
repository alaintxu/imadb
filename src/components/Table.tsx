"use client";
import { useState } from "react";
import { MdNavigateBefore, MdNavigateNext, MdFirstPage, MdLastPage} from 'react-icons/md';

export default function Table({headers, data, rowsPerPage, filter }: {headers: string[], data: string[][], rowsPerPage: number, filter: number[]}) {
    const [page, setPage] = useState(1);
    const [filterValue, setFilterValue] = useState<string[]>(() => Array(headers.length).fill(""));
    const maxPage = Math.max(1, Math.ceil(data.length / rowsPerPage));
    const filteredData = data.filter(row => filter.every(index => filterValue[index] === "" || row[index] === filterValue[index]));
    const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return (
        <div className="table-component">
            <Pagination page={page} maxPage={maxPage} onPageChange={setPage} />

            <table className="table-auto border-collapse p-4 m-4 shadow-lg text-left m-auto typewritter">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className="bg-clip text-gray-200 p-4">
                                {header}
                                {filter.includes(index) && <select id={`filter-${index}`} value={filterValue[index]} onChange={(e) => setFilterValue(prev => { const newFilterValue = [...prev]; newFilterValue[index] = e.target.value; return newFilterValue; })} className="ml-2 p-1 border border-gray-300 rounded">
                                    <option value="">---</option>
                                    {[...new Set(data.map(row => row[index]))].map((option, optionIndex) => (
                                        <option key={optionIndex} value={option}>{option}</option>
                                    ))}
                                    </select>}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((row, index) => (
                        <tr key={index} className="bg-folder text-black hover:bg-clip">
                            {row.map((cell, cellIndex) => (
                                <td className="p-4 border-b border-gray-200" key={cellIndex}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination page={page} maxPage={maxPage} onPageChange={setPage} />
        </div>
    );
}

function Pagination({ page, maxPage, onPageChange }: { page: number, maxPage: number, onPageChange: (page: number) => void }) {
    return (
        <div className="pagination my-4 flex items-center gap-3 justify-center">
            <button className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50" onClick={() => onPageChange(1)} disabled={page === 1}><MdFirstPage /></button>
            <button className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50" onClick={() => onPageChange(page - 1)} disabled={page === 1}><MdNavigateBefore /></button>
            <span>Page {page} of {maxPage}</span>
            <button className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50" onClick={() => onPageChange(page + 1)} disabled={page === maxPage}><MdNavigateNext /></button>
            <button className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50" onClick={() => onPageChange(maxPage)} disabled={page === maxPage}><MdLastPage /></button>
        </div>
    );
}