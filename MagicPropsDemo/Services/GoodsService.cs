using MagicPropsDemo.Models;
using MagicProsDemo.Services;

namespace MagicPropsDemo.Services
{
    public class GoodsService
    {
        public GoodsService() { }
        public IEnumerable<Goods> GetAllGoods()
        {
            return new BaseRepository<Goods>().GetBySql("Select * from Goods", null, System.Data.CommandType.Text);
        }
    }
}
