using MagicPropsComponents.Utilities;

namespace MagicPropsComponents.ViewModels.Popup
{
    public enum AnchorPointType
    {
        [EnumDescription("left-top")]
        TriggerLeftTop,
        [EnumDescription("left-bottom")]
        TriggerLeftBottom,
        [EnumDescription("right-top")]
        TriggerRightTop,
        [EnumDescription("right-bottom")]
        TriggerRightBottom,
        [EnumDescription("center")]
        TriggerCenter
    }
    public enum PopupToward
    {
        [EnumDescription("top-left")]
        TopLeft,
        [EnumDescription("top-right")]
        TopRight,
        [EnumDescription("bottom-left")]
        BottomLeft,
        [EnumDescription("bottom-right")]
        BottomRight,
        [EnumDescription("top-center")]
        TriggerTopCenter,
        [EnumDescription("bottom-center")]
        TriggerBottomCenter,
        [EnumDescription("left-center")]
        TriggerLeftCenter,
        [EnumDescription("right-center")]
        TriggerRightCenter,
    }
}
