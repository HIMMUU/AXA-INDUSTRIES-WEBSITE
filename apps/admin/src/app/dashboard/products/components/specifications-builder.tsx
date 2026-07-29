'use client';

import { ProductSpecificationItem } from '@axa/types';
import { Plus, Trash2, Sliders, ArrowUp, ArrowDown } from 'lucide-react';

interface SpecificationsBuilderProps {
  specifications: ProductSpecificationItem[];
  onChange: (specs: ProductSpecificationItem[]) => void;
}

export function SpecificationsBuilder({
  specifications = [],
  onChange
}: SpecificationsBuilderProps) {
  const addSpecification = () => {
    const newSpec: ProductSpecificationItem = {
      key: '',
      value: '',
      sortOrder: specifications.length
    };
    onChange([...specifications, newSpec]);
  };

  const updateSpecification = (
    index: number,
    field: 'key' | 'value',
    value: string
  ) => {
    const updated = specifications.map((spec, idx) => {
      if (idx === index) {
        return { ...spec, [field]: value };
      }
      return spec;
    });
    onChange(updated);
  };

  const removeSpecification = (index: number) => {
    const updated = specifications
      .filter((_, idx) => idx !== index)
      .map((spec, idx) => ({ ...spec, sortOrder: idx }));
    onChange(updated);
  };

  const moveSpecification = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= specifications.length) return;

    const copy = [...specifications];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;

    const reordered = copy.map((spec, idx) => ({ ...spec, sortOrder: idx }));
    onChange(reordered);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="h-4 w-4 text-purple-400" />
          <h3 className="text-xs font-semibold text-white">Product Specifications</h3>
        </div>
        <button
          type="button"
          onClick={addSpecification}
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10 transition"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add Spec</span>
        </button>
      </div>

      {specifications.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-center text-xs text-neutral-500">
          No technical specifications added yet. Click &quot;Add Spec&quot; above.
        </div>
      ) : (
        <div className="space-y-2.5">
          {specifications.map((spec, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2.5 transition focus-within:border-white/20"
            >
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Specification Name (e.g. Material)"
                  value={spec.key}
                  onChange={(e) => updateSpecification(idx, 'key', e.target.value)}
                  className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
                />
                <input
                  type="text"
                  placeholder="Value (e.g. Stainless Steel 316L)"
                  value={spec.value}
                  onChange={(e) => updateSpecification(idx, 'value', e.target.value)}
                  className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
                />
              </div>

              {/* Order buttons */}
              <div className="flex items-center gap-1">
                {idx > 0 && (
                  <button
                    type="button"
                    onClick={() => moveSpecification(idx, 'up')}
                    className="p-1.5 text-neutral-400 hover:text-white"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                )}
                {idx < specifications.length - 1 && (
                  <button
                    type="button"
                    onClick={() => moveSpecification(idx, 'down')}
                    className="p-1.5 text-neutral-400 hover:text-white"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeSpecification(idx)}
                  className="p-1.5 text-red-400 hover:text-red-300"
                  title="Remove Spec"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
