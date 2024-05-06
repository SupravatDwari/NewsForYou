using System;
using System.Collections.Generic;

namespace NewsForYou.DAL.Models;

public partial class Category
{
    public int CategoryId { get; set; }

    public string CategoryTitle { get; set; } = null!;

    public virtual ICollection<AgencyFeed> AgencyFeeds { get; set; } = new List<AgencyFeed>();

    public virtual ICollection<News> News { get; set; } = new List<News>();
}
