namespace MagicPropsDemo.Models
{
    public class Goods
    {
        public int ID { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Inventory { get; set; }
        public bool IsDiscount { get; set; }
        public bool IsActive { get; set; }
        public decimal Discount { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public string CreateBy { get; set; }
        public string LastModifiedBy { get; set; }
    }
}
