namespace MagicPropsComponents.ViewModels.Modal
{
    public enum ModalSettings
    {
        Small,
        Normal,
        Large,
        XLarge
    }
    public class ModalButton
    {

        public string CssClass { get; set; }

        public string Text { get; set; }

        public bool DismissModal { get; set; } = false;
    }
}
