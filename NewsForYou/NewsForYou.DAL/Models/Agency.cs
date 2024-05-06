using System;
using System.Collections.Generic;

namespace NewsForYou.DAL.Models;

public partial class Agency
{
    public int AgencyId { get; set; }

    public string AgencyName { get; set; } = null!;

    public string? AgencyLogoPath { get; set; }

    public virtual ICollection<AgencyFeed> AgencyFeeds { get; set; } = new List<AgencyFeed>();

    public virtual ICollection<News> News { get; set; } = new List<News>();
}
