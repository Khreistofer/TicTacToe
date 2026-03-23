import "./Controls.css";

export default function Controls({ isVsComputer, onToggleMode, onReset }: any) {
  return (
    <div className="controls">

      <span>Play vs Computer</span>

      <label className="switch">
        <input
          type="checkbox"
          checked={isVsComputer}
          onChange={onToggleMode}
        />
        <span className="slider"></span>
      </label>

      <button onClick={onReset}>
        Reset
      </button>

    </div>
  );
}