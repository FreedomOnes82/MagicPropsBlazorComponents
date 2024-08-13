using Microsoft.AspNetCore.Components;

namespace MagicPropsComponents.Abstractions
{
    public interface IMPPopup
    {
        [Parameter]
        bool Visible { get; set; }
        EventCallback<bool> VisibleChanged { get; set; }
        Task OnVisiableChanged(bool visible);
    }
}
