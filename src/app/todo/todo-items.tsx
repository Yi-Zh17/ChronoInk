'use client';
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState, useTransition } from "react";
import { Todo } from "../lib/definition";
import DateTimeDialPicker from "../component/wheel-time-picker";
import { LoaderCircle, Trash2 } from "lucide-react";
import { Check } from "lucide-react";
import { deleteTodos, updateTodos } from "../lib/data";

export default function TodoItemDialog({ todo, refreshTodosAction }: { todo: Todo, refreshTodosAction: () => void }) {

    const [isOpen, setIsOpen] = useState(false);
    const [deadline, setDeadline] = useState(todo.deadline);
    const [title, setTitle] = useState(todo.title);
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(async () => {
            const formData = new FormData(e.currentTarget);
            await updateTodos(formData);
            setIsOpen(false);
            refreshTodosAction();
        });
    };

    const handleDelete = (id: number) => {
        startTransition(async () => {
            await deleteTodos(id);
            setIsOpen(false);
            refreshTodosAction();
        })
    }

    return (
        <>
            <li
                key={todo.id}
                onClick={() => setIsOpen(true)}
                className="flex space-x-20 flex-col cursor-pointer hover:bg-gray-200 p-3 rounded-md last:border-b-2 last:border-gray-500"
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
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel className="@container max-w-lg space-y-4 border-gray-500 border-3 bg-white py-4 px-8 w-2/3 h-2/3 rounded-xl drop-shadow-2xl min-w-md">
                        <form className="flex flex-col w-full h-full space-y-3 mb-0" onSubmit={handleSubmit}>
                            <input type="hidden" name="id" value={todo.id} />
                                <input className="mt-3 text-center font-bold text-2xl border-b-2 border-gray-400 pb-1" type="text" value={title} name="title" onChange={e => { setTitle(e.target.value) }} placeholder="Title is required" required />
                            <div className="w-full h-1/8 mt-3">
                                <DateTimeDialPicker year={year} setYear={setYear} month={month} setMonth={setMonth} day={day} setDay={setDay} hour={hour} setHour={setHour} minute={minute} setMinute={setMinute} />
                            </div>
                            <input type="hidden" name="deadline" value={`${year}-${month}-${day} ${hour}:${minute}:00`} />
                            <div className="w-full h-1/2 mt-8">
                                <textarea
                                    className="w-full border-3 border-gray-400 h-full p-2 rounded-xl"
                                    name="notes"
                                    placeholder="There are no notes for this todo item."
                                    value={notes}
                                    onChange={e => { setNotes(e.target.value) }} />
                            </div>

                            <div className="flex w-full justify-between items-center">
                                {/* Left side: Trash and Check */}
                                <div className="relative flex flex-col items-start gap-2 w-12">
                                    {/* Trash button */}
                                    <button
                                        type="button"
                                        onClick={() => setConfirmMode(!confirmMode)}
                                        className={`scale-80 p-2 h-12 w-12 border-2 rounded-xl border-gray-400 aspect-square flex items-center justify-center transition-all duration-200 active:bg-red-500 ${confirmMode ? "bg-red-500 scale-100" : "bg-white hover:bg-red-400"}`}
                                    >
                                        <Trash2 />
                                    </button>
                                    {/* Check button, stacked below and slides right when confirmMode is true */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            handleDelete(todo.id);
                                            setConfirmMode(false);
                                        }}
                                        className={`p-2 h-12 w-12 bg-white rounded-full border-2 border-gray-400 flex items-center justify-center transition-all duration-300 ease-out absolute left-0 ${confirmMode ? "translate-x-16 rotate-360 opacity-100 pointer-events-auto active:scale-90" : "opacity-0 pointer-events-none"}`}
                                    >
                                        <Check className="w-5 h-5 text-red-500" />
                                    </button>
                                </div>
                                {/* Right side: Close and Save */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="bg-black/80 text-white px-4 py-2 rounded-xl hover:bg-gray-500 active:bg-gray-800"
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-black/80 text-white px-4 py-2 rounded-xl hover:bg-gray-500 active:bg-gray-800"
                                        type="submit"
                                        disabled={loading}>
                                            <div>{loading? <LoaderCircle className="animate-spin" /> : 'Save'}</div>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}