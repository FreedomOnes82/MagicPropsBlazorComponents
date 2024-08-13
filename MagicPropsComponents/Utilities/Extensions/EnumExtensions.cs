using System.Reflection;

namespace MagicPropsComponents.Utilities.Extensions
{
    public static class EnumExtensions
    {
        public static string GetDescription(this Enum value)
        {
            FieldInfo field = value.GetType().GetField(value.ToString());

            EnumDescriptionAttribute attribute =
                Attribute.GetCustomAttribute(field, typeof(EnumDescriptionAttribute)) as EnumDescriptionAttribute;

            return attribute == null ? value.ToString() : attribute.Description;
        }
    }
}
