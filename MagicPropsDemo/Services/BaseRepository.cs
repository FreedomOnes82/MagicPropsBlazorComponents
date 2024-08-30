using Microsoft.Data.SqlClient;
using System.Data;
using Dapper;
using Dapper.Contrib.Extensions;

namespace MagicProsDemo.Services
{
    public interface IRepository<T> where T : class
    {
        T GetById(string id);
        IEnumerable<T> GetAll();
        IEnumerable<T> GetBySql(string sql, Dictionary<string, object> parameter, CommandType commandType);
        IEnumerable<T> GetByPaging(string sql, Dictionary<string, object> parameters, CommandType commandType);

        void Add(T entity);
        void Delete(T entity);
        void Update(T Entity);

    }

    public class BaseRepository<T> : IRepository<T> where T : class
    {
        private IDbConnection _connection;
        public BaseRepository()
        {
            this._connection = new SqlConnection("server=.;database=demojc;user id=sa;password=sa;Encrypt=false;");
        }

        public IEnumerable<T> GetAll()
        {
            
            var result = _connection.GetAll<T>();
            return result;
        }

        public T GetById(string id)
        {
            var result = _connection.Get<T>(id);
            return result;
        }

        public IEnumerable<T> GetByPaging(string sql, Dictionary<string, object> parameters, CommandType commandType)
        {
            //TODO query paging
            return null;
        }

        public IEnumerable<T> GetBySql(string sql, Dictionary<string, object> parameters, CommandType commandType)
        {
            var result = _connection.Query<T>(sql, parameters, commandType: commandType);
            return result;
        }

        public void Add(T entity)
        {
            _connection.Insert(entity, null);
        }
        public void Update(T entity)
        {
            _connection.Update(entity);
        }
        public void Delete(T entity)
        {
            _connection.Delete(entity);
        }
    }
}
