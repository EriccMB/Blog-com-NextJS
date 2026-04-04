import Button from '../Button';

type DialogProps = {
  isVisible?: boolean;
  title: string;
  content: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  disabled: boolean;
};

export default function Dialog({
  isVisible = false,
  title,
  content,
  onConfirm,
  onCancel,
  disabled = false,
}: DialogProps) {
  if (!isVisible) return null;

  function handleCancel() {
    if (disabled) return;

    onCancel();
  }
  return (
    <div
      className="bg-black/40 backdrop-blur-xs fixed inset-0 
                      flex items-center justify-center"
      onClick={handleCancel}
    >
      <div
        className="bg-stone-100 p-6 rounded-xl max-w-2xl mx-4
                          flex flex-col gap-6
                          shadow-lg shadow-black/30
                          text-center "
        role="dialog"
        aria-modal={true}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-extrabold text-xl" id="dialog-title">
          {title}
        </h3>
        <div id="dialog-content">{content}</div>
        <div className="flex justify-around ">
          <Button variant="default" onClick={onConfirm} disabled={disabled}>
            Ok
          </Button>

          <Button
            variant="danger"
            autoFocus
            onClick={handleCancel}
            disabled={disabled}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
