'use client';
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState, useTransition } from "react";
import { Todo } from "../lib/definition";
import DateTimeDialPicker from "../component/wheel-time-picker";
import { Trash2 } from "lucide-react";
import { Check } from "lucide-react";

export default function TodoItemDialog({ todo }: { todo: Todo }) {
    const [isOpen, setIsOpen] = useState(false);
    const [deadline, setDeadline] = useState(todo.deadline);
    const [notes, setNotes] = useState(todo.notes || '');
    const [loading, startTransition] = useTransition();
    const [confirmMode, setConfirmMode] = useState(false);

    const ddl = new Date(deadline);
    const n_year = ddl.getFullYear().toString();
    const n_month = (ddl.getMonth() + 1).toString().padStart(2, "0");
    const n_day = ddl.getDate().toString().padStart(2, "0");
    const n_hour = ddl.getHours().toString().padStart(2, "0");
    const n_minute = ddl.getMinutes().toString().padStart(2, "0");

    const [year, setYear] = useState(n_year);
    const [month, setMonth] = useState(n_month);
    const [day, setDay] = useState(n_day);
    const [hour, setHour] = useState(n_hour);
    const [minute, setMinute] = useState(n_minute);

    return (
        <>
            <li
                key={todo.id}
                onClick={() => setIsOpen(true)}
                className="flex space-x-20 flex-col cursor-pointer hover:bg-gray-200 p-3 rounded-md first:border-t-2 last:border-b-2 last:border-gray-500"
            >
                <h2 className='text-xl font-medium'>{todo.title}</h2>
                <div className='ml-auto'>
                    <p>Deadline: {new Date(todo.deadline).toLocaleString(undefined, {
                        hour12: false,
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</p>
                </div>
            </li>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="@container max-w-lg space-y-4 border-gray-500 border-3 bg-white py-6 px-8 w-2/3 h-2/3 rounded-xl drop-shadow-2xl min-w-md">
                        <DialogTitle className="font-bold text-2xl justify-center flex mb-0">{todo.title}</DialogTitle>
                        <div className="w-full h-1/8 mb-7">
                            <DateTimeDialPicker year={year} setYear={setYear} month={month} setMonth={setMonth} day={day} setDay={setDay} hour={hour} setHour={setHour} minute={minute} setMinute={setMinute} />
                        </div>
                        <div className="space-y-2 w-full h-3/5">
                            <textarea
                                className="w-full border-3 border-gray-400 h-full p-2 rounded-xl"
                                name="notes"
                                placeholder="There are no notes for this todo item."
                                value={todo.notes ? todo.notes : ''}
                                onChange={e => { setNotes(e.target.value) }} />
                        </div>
                        <div className="relative flex justify-end gap-3 h-1/10" onAbort={(e) => e.stopPropagation()}>
                            <div className="relative w-12 h-full pr-0">
                            <button
                                onClick={() => {
                                    alert("Deleted!"); // Replace with your delete action
                                    setConfirmMode(false);
                                }}
                                className={`absolute inset-0 p-2 flex bg-white rounded-full border-2 border-gray-400 transition-all duration-300 ease-out h-full aspect-square hover:scale-120 active:bg-red-500 ${confirmMode
                                        ? "opacity-100 -translate-x-15 -rotate-360"
                                        : "opacity-0 translate-x-0 pointer-events-none"
                                    }`}
                            >
                                <Check className="w-5 h-5 text-red-500" />
                            </button>
                            <button
                                onClick={() => { setConfirmMode(!confirmMode); }}
                                className={`absolute inset-0 p-2 flex h-full border-2 rounded-xl border-gray-400 aspect-square items-center justify-center transition-all duration-150 active:bg-red-500 ${confirmMode? "scale-120 bg-red-500" : "bg-white hover:bg-red-400"}`}
                            >
                                <Trash2 />
                            </button>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="bg-black/80 text-white px-4 py-2 rounded-xl hover:bg-gray-500 active:bg-gray-800"
                            >
                                Close
                            </button>
                            <button
                                className="bg-black/80 text-white px-4 py-2 rounded-xl hover:bg-gray-500 active:bg-gray-800"
                                type="submit"
                                onClick={() => setIsOpen(false)}>
                                Save
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}