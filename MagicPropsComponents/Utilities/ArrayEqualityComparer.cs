namespace MagicPropsComponents.Utilities
{
    public class ArrayEqualityComparer<T> : IEqualityComparer<T[]>
    {
        private readonly bool _ignoreCase;

        public ArrayEqualityComparer(bool ignoreCase)
        {
            _ignoreCase = ignoreCase;
        }

        public bool Equals(T[] x, T[] y)
        {
            return _ignoreCase ? IgnoreCaseEquals(x, y) : x.SequenceEqual(y);
        }

        public int GetHashCode(T[] obj)
        {
            if (_ignoreCase)
                return GetIgnoreCaseHashCode(obj);

            unchecked
            {
                int hash = 17;
                foreach (var item in obj)
                {
                    hash = hash * 23 + (item?.GetHashCode() ?? 0);
                }
                return hash;
            }
        }

        public bool IgnoreCaseEquals(T[] x, T[] y)
        {
            if (ReferenceEquals(x, y))
                return true;
            if (x == null || y == null)
                return false;
            if (x.Length != y.Length)
                return false;

            for (int i = 0; i < x.Length; i++)
            {
                if (x[i] is string strX && y[i] is string strY)
                {
                    if (!strX.Equals(strY, StringComparison.OrdinalIgnoreCase))
                    {
                        return false;
                    }
                }
                else if (!EqualityComparer<T>.Default.Equals(x[i], y[i]))
                {
                    return false;
                }
            }

            return true;
        }

        public int GetIgnoreCaseHashCode(T[] obj)
        {
            if (obj == null)
                return 0;

            unchecked
            {
                int hash = 17;
                foreach (var item in obj)
                {
                    if (item is string str)
                    {
                        string lowerStr = str.ToLowerInvariant();
                        hash = hash * 23 + lowerStr.GetHashCode();
                    }
                    else
                    {
                        hash = hash * 23 + (item?.GetHashCode() ?? 0);
                    }
                }
                return hash;
            }
        }
    }
}
