
'use client';

import type { DragEvent } from "react";
import { useMemo, useState } from "react";
import { TodoWidget } from "./component/todo-widget";

type WidgetId = 'todo';
type ColumnId = 'left' | 'right';

type ColumnState = Record<ColumnId, WidgetId[]>;

export default function Home() {
  const initialLayout: ColumnState = useMemo(
    () => ({ left: ['todo'], right: [] }),
    [],
  );
  const [columns, setColumns] = useState<ColumnState>(initialLayout);

  const renderWidget = (widgetId: WidgetId) => {
    switch (widgetId) {
      case 'todo':
        return <TodoWidget />;
      default:
        return null;
    }
  };

  const handleDragStart = (
    widgetId: WidgetId,
    fromColumn: ColumnId,
    fromIndex: number,
    event: DragEvent<HTMLDivElement>,
  ) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData(
      'application/widget',
      JSON.stringify({ widgetId, fromColumn, fromIndex })
    );
  };

  const handleDrop = (
    toColumn: ColumnId,
    targetIndex: number,
    event: DragEvent<HTMLDivElement>,
  ) => {
    event.stopPropagation();
    event.preventDefault();
    const payload = event.dataTransfer.getData('application/widget');
    if (!payload) return;

    const { widgetId, fromColumn, fromIndex } = JSON.parse(payload) as {
      widgetId: WidgetId;
      fromColumn: ColumnId;
      fromIndex: number;
    };

    setColumns((prev) => {
      if (fromColumn === toColumn) {
        const updated = [...prev[fromColumn]];
        if (!updated[fromIndex] || updated[fromIndex] !== widgetId) return prev;

        updated.splice(fromIndex, 1);

        let insertIndex = targetIndex;
        if (fromIndex < targetIndex) {
          insertIndex = Math.max(targetIndex - 1, 0);
        }
        insertIndex = Math.min(insertIndex, updated.length);
        updated.splice(insertIndex, 0, widgetId);

        return { ...prev, [fromColumn]: updated };
      }

      const source = [...prev[fromColumn]];
      const destination = [...prev[toColumn]];
      if (!source[fromIndex] || source[fromIndex] !== widgetId) return prev;

      source.splice(fromIndex, 1);
      const insertIndex = Math.min(targetIndex, destination.length);
      destination.splice(insertIndex, 0, widgetId);

      return {
        ...prev,
        [fromColumn]: source,
        [toColumn]: destination,
      };
    });
  };

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const renderColumn = (columnId: ColumnId) => {
    const widgets = columns[columnId];
    return (
      <div
        className="rounded-2xl border border-dashed border-gray-300 bg-white/40 p-3 min-h-[400px] space-y-4"
        onDragOver={allowDrop}
        onDrop={(event) => handleDrop(columnId, widgets.length, event)}
      >
        {widgets.map((widgetId, index) => (
          <div
            key={`${widgetId}-${index}`}
            className="bg-white rounded-xl shadow-sm border border-gray-200 cursor-grab active:cursor-grabbing"
            draggable
            onDragStart={(event) => handleDragStart(widgetId, columnId, index, event)}
            onDragOver={allowDrop}
            onDrop={(event) => handleDrop(columnId, index, event)}
          >
            {renderWidget(widgetId)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-200 px-6 py-10">
      <div className="grid grid-cols-2 gap-6">
        {renderColumn('left')}
        {renderColumn('right')}
      </div>
    </div>
  );
}
