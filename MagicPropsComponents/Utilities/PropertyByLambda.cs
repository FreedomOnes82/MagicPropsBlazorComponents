using System.Collections.Concurrent;
using System.Linq.Expressions;
using System.Reflection;

namespace MagicPropsComponents.Utilities
{
    /// <summary>
    /// 
    /// </summary>
    public class PropertyByLambda
    {

        private readonly PropertyGetter getter;
        private readonly PropertySetter setter;
        public string Name { get; private set; }

        public PropertyInfo Info { get; private set; }

        public PropertyByLambda(PropertyInfo propertyInfo)
        {
            if (propertyInfo == null)
                throw new NullReferenceException("Property cannot be null");
            Name = propertyInfo.Name;
            Info = propertyInfo;
            if (Info.CanRead)
            {
                getter = new PropertyGetter(propertyInfo);
            }

            if (Info.CanWrite)
            {
                setter = new PropertySetter(propertyInfo);
            }
        }


        /// <summary>
        /// GetValue of property
        /// </summary>
        /// <param name="instance"></param>
        /// <returns></returns>
        public object GetValue(object instance)
        {
            return getter?.Invoke(instance);
        }


        /// <summary>
        /// Set value
        /// </summary>
        /// <param name="instance"></param>
        /// <param name="value"></param>
        public void SetValue(object instance, object value)
        {
            setter?.Invoke(instance, value);
        }

        private static readonly ConcurrentDictionary<Type, PropertyByLambda[]> securityCache = new ConcurrentDictionary<Type, PropertyByLambda[]>();

        public static PropertyByLambda[] GetProperties(Type type)
        {
            return securityCache.GetOrAdd(type, t => t.GetProperties().Select(p => new PropertyByLambda(p)).ToArray());
        }

    }

    /// <summary>
    /// Get operation
    /// </summary>
    public class PropertyGetter
    {
        private readonly Func<object, object> funcGet;

        public PropertyGetter(PropertyInfo propertyInfo) : this(propertyInfo?.DeclaringType, propertyInfo.Name)
        {

        }

        public PropertyGetter(Type declareType, string propertyName)
        {
            if (declareType == null)
            {
                throw new ArgumentNullException(nameof(declareType));
            }
            if (propertyName == null)
            {
                throw new ArgumentNullException(nameof(propertyName));
            }



            funcGet = CreateGetValueDeleagte(declareType, propertyName);
        }


        private static Func<object, object> CreateGetValueDeleagte(Type declareType, string propertyName)
        {
            // (object instance) => (object)((declaringType)instance).propertyName

            var param_instance = Expression.Parameter(typeof(object));
            var body_objToType = Expression.Convert(param_instance, declareType);
            var body_getTypeProperty = Expression.Property(body_objToType, propertyName);
            var body_return = Expression.Convert(body_getTypeProperty, typeof(object));
            return Expression.Lambda<Func<object, object>>(body_return, param_instance).Compile();
        }

        public object Invoke(object instance)
        {
            return funcGet?.Invoke(instance);
        }
    }


    public class PropertySetter
    {
        private readonly Action<object, object> setFunc;

        public PropertySetter(PropertyInfo property)
        {
            if (property == null)

            {
                throw new ArgumentNullException(nameof(property));
            }
            setFunc = CreateSetValueDelagate(property);
        }


        private static Action<object, object> CreateSetValueDelagate(PropertyInfo property)
        {
            var param_instance = Expression.Parameter(typeof(object));
            var param_value = Expression.Parameter(typeof(object));

            var body_instance = Expression.Convert(param_instance, property.DeclaringType);
            var body_value = Expression.Convert(param_value, property.PropertyType);
            var body_call = Expression.Call(body_instance, property.GetSetMethod(), body_value);

            return Expression.Lambda<Action<object, object>>(body_call, param_instance, param_value).Compile();
        }

        public void Invoke(object instance, object value)
        {
            setFunc?.Invoke(instance, value);
        }
    }
}
