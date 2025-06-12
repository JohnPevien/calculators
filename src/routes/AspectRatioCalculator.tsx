import React, { useCallback, useEffect, useState } from 'react';

interface Preset {
  label: string;
  w: number;
  h: number;
}

const PRESETS: Preset[] = [
  { label: 'HD Video 16:9', w: 16, h: 9 },
  { label: 'Standard 4:3', w: 4, h: 3 },
  { label: 'Cinema 21:9', w: 21, h: 9 },
  { label: 'Square 1:1', w: 1, h: 1 },
  { label: 'Custom', w: 0, h: 0 },
];

const round = (val: number) => Math.round(val * 100) / 100;

const AspectRatioCalculator: React.FC = () => {
  const [ratioW, setRatioW] = useState<number>(16);
  const [ratioH, setRatioH] = useState<number>(9);
  const [pxW, setPxW] = useState<number>(1280);
  const [pxH, setPxH] = useState<number>(720);
  const [selectedPreset, setSelectedPreset] = useState<string>('HD Video 16:9');

  const recalcHeight = useCallback(
    (baseWidth: number, w: number = ratioW, h: number = ratioH) => {
      if (!w || !h) return baseWidth;
      return round((baseWidth * h) / w);
    },
    [ratioW, ratioH]
  );

  const recalcWidth = useCallback(
    (baseHeight: number, w: number = ratioW, h: number = ratioH) => {
      if (!w || !h) return baseHeight;
      return round((baseHeight * w) / h);
    },
    [ratioW, ratioH]
  );

  /** When ratio changes -> adjust pixel height */
  useEffect(() => {
    setPxH(recalcHeight(pxW));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ratioW, ratioH]);

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const label = e.target.value;
    setSelectedPreset(label);
    const preset = PRESETS.find(p => p.label === label);
    if (preset && preset.w && preset.h) {
      setRatioW(preset.w);
      setRatioH(preset.h);
    }
  };

  const handleRatioWChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPreset('Custom');
    const val = +e.target.value;
    setRatioW(val);
  };

  const handleRatioHChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPreset('Custom');
    const val = +e.target.value;
    setRatioH(val);
  };

  const handlePxWChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = +e.target.value;
    setPxW(val);
    setPxH(recalcHeight(val));
  };

  const handlePxHChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = +e.target.value;
    setPxH(val);
    setPxW(recalcWidth(val));
  };

  return (
    <div className="card bg-base-200 shadow max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Aspect Ratio Calculator</h1>
      <p>
        Use this <strong>ratio calculator</strong> to check the dimensions when resizing images.
      </p>

      {/* Presets */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Common Presets</legend>
        <select className="select select-bordered w-full max-w-xs" value={selectedPreset} onChange={handlePresetChange}>
          {PRESETS.map(p => (
            <option key={p.label} value={p.label}>
              {p.label}
            </option>
          ))}
        </select>
      </fieldset>

      {/* Ratio Inputs */}
      <div className="grid grid-cols-2 gap-4">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Ratio width</legend>
          <input
            type="number"
            className="input input-bordered w-full"
            value={ratioW}
            onChange={handleRatioWChange}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Ratio height</legend>
          <input
            type="number"
            className="input input-bordered w-full"
            value={ratioH}
            onChange={handleRatioHChange}
          />
        </fieldset>
      </div>

      {/* Pixel Inputs */}
      <div className="grid grid-cols-2 gap-4">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Pixels width</legend>
          <input
            type="number"
            className="input input-bordered w-full"
            value={pxW}
            onChange={handlePxWChange}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Pixels height</legend>
          <input
            type="number"
            className="input input-bordered w-full"
            value={pxH}
            onChange={handlePxHChange}
          />
        </fieldset>
      </div>
    </div>
  );
};

export default AspectRatioCalculator;
