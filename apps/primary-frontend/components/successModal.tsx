type SuccessPopupProps = {
  onSignIn?: () => void;
};

export function SuccessPopup({ onSignIn }: SuccessPopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md">
      <div className="w-[90%] max-w-md rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-2xl p-8 text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 border border-green-400/30">
          <svg
            className="h-10 w-10 text-green-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="mt-6 font-display text-2xl font-bold text-white">
          Success
        </h2>

        <p className="mt-3 font-inter text-neutral-300 leading-relaxed text-sm">
          Your account has been created successfully.
          <br />
          Sign in to continue.
        </p>

        <button
          onClick={() => {
            if (onSignIn) {
              onSignIn();
            } else {
              window.location.href = "/signin";
            }
          }}
          className="w-full mt-6 px-4 py-2.5 rounded-lg bg-[#FF4F00] hover:bg-[#FF641F] active:bg-[#E04600] text-white font-medium text-sm transition-colors cursor-pointer"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}