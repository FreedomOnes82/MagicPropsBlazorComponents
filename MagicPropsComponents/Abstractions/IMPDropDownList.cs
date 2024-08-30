using MagicPropsComponents.ViewModels.DropDownList;

namespace MagicPropsComponents.Abstractions
{
    public interface IMPDropDownList
    {
        public bool Multiple { get; set; }
        public void AddChildDatasource(DefaultOptionModel value);
        void DeleteChildDatasource(string value);
    }
}
