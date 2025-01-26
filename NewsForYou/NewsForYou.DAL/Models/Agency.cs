using System;
using System.Collections.Generic;

namespace NewsForYou.DAL.Models;

public partial class Agency
{
    public int AgencyId { get; set; }

    public string AgencyName { get; set; } = null!;

    public string? AgencyLogoPath { get; set; }

    public virtual AgencyFeed? AgencyFeed { get; set; }

    public virtual ICollection<News> News { get; set; } = new List<News>();
}
