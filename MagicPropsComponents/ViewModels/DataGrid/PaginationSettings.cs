using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MagicPropsComponents.ViewModels.DataGrid
{
    public class PaginationSettings
    {
        public bool EnablePagination { get; set; }
        public PaginationModes PaginationMode { get; set; }
        public int PageSize { get; set; } = 20;
    }

    public enum PaginationModes
    {
        ClientSide,
        ServerSide
    }
}
