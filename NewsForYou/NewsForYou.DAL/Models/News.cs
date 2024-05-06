using System;
using System.Collections.Generic;

namespace NewsForYou.DAL.Models;

public partial class News
{
    public int NewsId { get; set; }

    public string NewsTitle { get; set; } = null!;

    public string NewsDescription { get; set; } = null!;

    public DateTime NewsPublishDateTime { get; set; }

    public string NewsLink { get; set; } = null!;

    public int? ClickCount { get; set; }

    public int CategoryId { get; set; }

    public int AgencyId { get; set; }

    public virtual Agency Agency { get; set; } = null!;

    public virtual Category Category { get; set; } = null!;
}
