interface Props {
  seconds: number;
  running: boolean;
  onTimeout: () => void;
}

/**
 * Drains from full to empty over `seconds` with a CSS animation and calls `onTimeout`
 * when it ends. Pausing freezes it where it is. Remount (via `key`) to restart.
 */
export default function TimerBar({ seconds, running, onTimeout }: Props) {
  return (
    <div className="timer" role="timer" aria-label={`${seconds} second timer`}>
      <i
        style={{ animationDuration: `${seconds}s`, animationPlayState: running ? 'running' : 'paused' }}
        onAnimationEnd={onTimeout}
      />
    </div>
  );
}
