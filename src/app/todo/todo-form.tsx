'use client';
import { useState, useTransition } from 'react';
import { Dialog } from '@headlessui/react';
import { Plus, LoaderCircle } from 'lucide-react';
import { postTodos } from '../lib/data';
import { useRouter } from 'next/navigation';
import DateTimeDialPicker from '../component/wheel-time-picker';


export default function AddTodo() {
  const router = useRouter();

  const currentTime = new Date();

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState(currentTime.getFullYear().toString());
  const [month, setMonth] = useState((currentTime.getMonth()+1).toString().padStart(2, "0"));
  const [day, setDay] = useState(currentTime.getDate().toString().padStart(2, "0"));
  const [hour, setHour] = useState(currentTime.getHours().toString().padStart(2, "0"));
  const [minute, setMinute] = useState(currentTime.getMinutes().toString().padStart(2, "0"));
  const [notes, setNotes] = useState('');
  const [loading, startTransition] = useTransition();


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const formData = new FormData(e.currentTarget);
      await postTodos(formData);
      setTitle('');
      setYear(currentTime.getFullYear().toString());
      setMonth((currentTime.getMonth()+1).toString().padStart(2, "0"));
      setDay(currentTime.getDate().toString().padStart(2, "0"));
      setHour(currentTime.getHours().toString().padStart(2, "0"));
      setMinute(currentTime.getMinutes().toString().padStart(2, "0"));
      setNotes('');
      setIsOpen(false);
      router.refresh();
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-white text-black px-4 py-2 rounded-xl hover:bg-gray-100 active:bg-gray-300 flex w-38 justify-center border-3 border-gray-400 items-center"
      >
        <Plus />
        <p className='ml-2 font-bold text-lg'>Add Todo</p>
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

        {/* Centered Modal */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 space-y-4 shadow-lg" role="dialog" aria-modal="true">
            <h2 className="text-xl font-bold">New Todo</h2>
            <p className="text-gray-600">
              Fill out the form below to add a new todo item.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full border rounded p-2"
                required
              />
              <DateTimeDialPicker year={year} setYear={setYear}
                month={month} setMonth={setMonth}
                day={day} setDay={setDay}
                hour={hour} setHour={setHour}
                minute={minute} setMinute={setMinute} />
              <input type="hidden" name="deadline" value={`${year}-${month}-${day} ${hour}:${minute}:00`} />
              <textarea
                name="notes"
                placeholder="Notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full border rounded p-2"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-gray-500 hover:underline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  <div>
                    {loading ? <LoaderCircle className="animate-spin" /> : 'Add Todo'}
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </>
  );
}
