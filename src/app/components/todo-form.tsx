'use client';

import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { Plus } from 'lucide-react';

type Props = {
  onTodoAdded: () => void;
};


export default function AddTodo({onTodoAdded} : Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddTodo = async () => {
    if (!title.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          completed: false,
          deadline: deadline ? new Date(deadline).toISOString() : null,
          created_at: new Date().toISOString(),
          notes: notes? notes : null,
        }),
      });

      if (res.ok) {
        setTitle('');
        setDeadline('');
        setNotes('');
        setIsOpen(false);
        onTodoAdded();
      }
    } catch (err) {
      console.error('Add failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-white text-black px-4 py-2 rounded-xl hover:bg-gray-100 active:bg-gray-300 flex w-35 justify-center border-3 border-gray-300"
      >
        <Plus />
         <p className='ml-2'>Add Todo</p>
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

        {/* Centered Modal */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 space-y-4 shadow-lg">
            <Dialog.Title className="text-xl font-bold">New Todo</Dialog.Title>
            <Dialog.Description className="text-gray-600">
              Fill out the form below to add a new todo item.
            </Dialog.Description>

            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full border rounded p-2"
            />
            <input
              type="datetime-local"
              value={deadline}
              onChange={e => setDeadline(e.target.value)}
              className="w-full border rounded p-2"
            />
            <textarea
              placeholder="Notes"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full border rounded p-2"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="text-sm text-gray-500 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTodo}
                disabled={loading}
                className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Todo'}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
