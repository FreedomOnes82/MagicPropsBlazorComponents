using System.ComponentModel;
namespace MagicPropsDemo.Models
{
    public class Goods
    {
        public int ID { get; set; }
        public string Category { get; set; }
        [DisplayName("Sub Category")]
        public string SubCategory { get; set; }
        
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Inventory { get; set; }
        [DisplayName("Is Discount")]
        public bool IsDiscount { get; set; }
        [DisplayName("Is Active")]
        public bool IsActive { get; set; }
        public decimal Discount { get; set; }
        [DisplayName("Create Date")]
        public DateTime CreateDate { get; set; }
        [DisplayName("Last Modified Date")]
        public DateTime LastModifiedDate { get; set; }
        [DisplayName("Create Person")]
        public string CreateBy { get; set; }
        [DisplayName("Last Modified Person")]
        public string LastModifiedBy { get; set; }
    }
}
