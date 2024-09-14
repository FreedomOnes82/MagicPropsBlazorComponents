using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MagicPropsComponents.Utilities
{
    public class ValueConverter
    {
        public static object? GetValue(string? rawValue, Type propType)
        {
            if (propType == typeof(byte))
            {
                return string.IsNullOrEmpty(rawValue) ? 0 : Convert.ToByte(rawValue);
            }

            if (propType == typeof(sbyte))
            {
                return string.IsNullOrEmpty(rawValue) ? 0 : Convert.ToSByte(rawValue);
            }

            if (propType == typeof(short))
            {
                return GetShort(rawValue ?? "") ?? 0;
            }

            if (propType == typeof(ushort))
            {
                return GetUShort(rawValue ?? "") ?? 0;
            }

            if (propType == typeof(int))
            {
                return GetInt(rawValue ?? "") ?? 0;
            }

            if (propType == typeof(uint))
            {
                return GetUInt(rawValue ?? "") ?? 0;
            }
            if (propType == typeof(long))
            {
                return GetLong(rawValue ?? "") ?? 0;
            }
            if (propType == typeof(ulong))
            {
                return GetULong(rawValue ?? "") ?? 0;
            }
            if (propType == typeof(float))
            {
                return GetFloat(rawValue ?? "") ?? 0;
            }

            if (propType == typeof(double))
            {
                return GetDouble(rawValue ?? "") ?? 0;
            }

            if (propType == typeof(decimal))
            {
                return GetDecimal(rawValue ?? "") ?? 0;
            }

            if (propType == typeof(char))
            {
                return GetChar(rawValue ?? "") ?? default;
            }
            if (propType == typeof(bool))
            {
                return GetBool(rawValue ?? "") ?? default;
            }
            if (propType == typeof(string))
            {
                return rawValue ?? "";
            }

            if (propType == typeof(byte?))
            {
                return string.IsNullOrEmpty(rawValue) ? default : Convert.ToByte(rawValue);
            }

            if (propType == typeof(sbyte?))
            {
                return string.IsNullOrEmpty(rawValue) ? default : Convert.ToSByte(rawValue);
            }

            if (propType == typeof(short?))
            {
                return GetShort(rawValue ?? "") ?? default;
            }

            if (propType == typeof(ushort?))
            {
                return GetUShort(rawValue ?? "") ?? default;
            }

            if (propType == typeof(int?))
            {
                return GetInt(rawValue ?? "") ?? default;
            }

            if (propType == typeof(uint?))
            {
                return GetUInt(rawValue ?? "") ?? default;
            }
            if (propType == typeof(long?))
            {
                return GetLong(rawValue ?? "") ?? default;
            }
            if (propType == typeof(ulong?))
            {
                return GetULong(rawValue ?? "") ?? default;
            }
            if (propType == typeof(float?))
            {
                return GetFloat(rawValue ?? "") ?? default;
            }

            if (propType == typeof(double?))
            {
                return GetDouble(rawValue ?? "") ?? default;
            }

            if (propType == typeof(decimal?))
            {
                return GetDecimal(rawValue ?? "") ?? default;
            }

            if (propType == typeof(char?))
            {
                return GetChar(rawValue ?? "") ?? default;
            }

            if (propType == typeof(bool?))
            {
                return GetBool(rawValue ?? "") ?? default;
            }
            return rawValue;
        }

        private static string RemoveNonNumericChars(string input)
        {
            return new string(input.Where(c => char.IsDigit(c) || c == ',' || c == '.').ToArray());
        }

        private static short? GetShort(string val)
        {
            short destVl;
            string cleanedAmountString = RemoveNonNumericChars(val);
            if (short.TryParse(cleanedAmountString, NumberStyles.AllowCurrencySymbol | NumberStyles.AllowThousands | NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture, out destVl))
            {
                return destVl;
            }
            return null;
        }

        private static ushort? GetUShort(string val)
        {
            ushort destVl;
            string cleanedAmountString = RemoveNonNumericChars(val);
            if (ushort.TryParse(cleanedAmountString, NumberStyles.AllowCurrencySymbol | NumberStyles.AllowThousands | NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture, out destVl))
            {
                return destVl;
            }
            return null;
        }

        private static int? GetInt(string val)
        {
            int destVl;
            string cleanedAmountString = RemoveNonNumericChars(val);
            if (int.TryParse(cleanedAmountString, NumberStyles.AllowCurrencySymbol | NumberStyles.AllowThousands | NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture, out destVl))
            {
                return destVl;
            }
            return null;
        }

        private static uint? GetUInt(string val)
        {
            uint destVl;
            string cleanedAmountString = RemoveNonNumericChars(val);
            if (uint.TryParse(cleanedAmountString, NumberStyles.AllowCurrencySymbol | NumberStyles.AllowThousands | NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture, out destVl))
            {
                return destVl;
            }
            return null;
        }

        private static long? GetLong(string val)
        {
            long destVl;
            string cleanedAmountString = RemoveNonNumericChars(val);
            if (long.TryParse(cleanedAmountString, NumberStyles.AllowCurrencySymbol | NumberStyles.AllowThousands | NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture, out destVl))
            {
                return destVl;
            }
            return null;
        }

        private static ulong? GetULong(string val)
        {
            ulong destVl;
            string cleanedAmountString = RemoveNonNumericChars(val);
            if (ulong.TryParse(cleanedAmountString, NumberStyles.AllowCurrencySymbol | NumberStyles.AllowThousands | NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture, out destVl))
            {
                return destVl;
            }
            return null;
        }

        private static decimal? GetDecimal(string val)
        {
            decimal destVl;
            string cleanedAmountString = RemoveNonNumericChars(val);
            if (decimal.TryParse(cleanedAmountString, NumberStyles.AllowCurrencySymbol | NumberStyles.AllowThousands | NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture, out destVl))
            {
                return destVl;
            }
            return null;
        }

        private static float? GetFloat(string val)
        {
            float amount;
            string cleanedAmountString = RemoveNonNumericChars(val);
            if (float.TryParse(cleanedAmountString, NumberStyles.AllowCurrencySymbol | NumberStyles.AllowThousands | NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture, out amount))
            {
                return amount;
            }
            return null;
        }

        private static double? GetDouble(string val)
        {
            double amount;
            string cleanedAmountString = RemoveNonNumericChars(val);
            if (double.TryParse(cleanedAmountString, NumberStyles.AllowCurrencySymbol | NumberStyles.AllowThousands | NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture, out amount))
            {
                return amount;
            }
            return null;
        }

        private static bool? GetBool(string val)
        {
            return val.Length > 0 ? bool.Parse(val) : default;
        }

        private static char? GetChar(string val)
        {
            return val.Length > 0 ? val[0] : null;
        }

        public static object CloneObject(object original)
        {
            if (original == null)
                return null;
            Type type = original.GetType();
            if (!type.IsClass)
                return original;
            object clone = Activator.CreateInstance(type);
            var properties = type.GetProperties();
            foreach (var property in properties)
            {
                if (property.CanRead && property.CanWrite)
                {
                    object value = property.GetValue(original);
                    property.SetValue(clone, value);
                }
            }
            return clone;
        }
    }
}
