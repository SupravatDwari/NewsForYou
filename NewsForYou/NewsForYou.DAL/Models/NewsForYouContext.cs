using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace NewsForYou.DAL.Models;

public partial class NewsForYouContext : DbContext
{
    public NewsForYouContext()
    {
    }

    public NewsForYouContext(DbContextOptions<NewsForYouContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Agency> Agencies { get; set; }

    public virtual DbSet<AgencyFeed> AgencyFeeds { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<News> News { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Agency>(entity =>
        {
            entity.HasKey(e => e.AgencyId).HasName("PK__agency__95C546DB2229DE4C");

            entity.ToTable("Agency");

            entity.Property(e => e.AgencyLogoPath)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.AgencyName)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<AgencyFeed>(entity =>
        {
            entity.HasKey(e => e.AgencyFeedId).HasName("PK__AgencyFe__CD7F82BDAE616339");

            entity.ToTable("AgencyFeed");

            entity.Property(e => e.AgencyFeedUrl)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Agency).WithMany(p => p.AgencyFeeds)
                .HasForeignKey(d => d.AgencyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__AgencyFee__Agenc__3E52440B");

            entity.HasOne(d => d.Category).WithMany(p => p.AgencyFeeds)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__AgencyFee__Categ__3F466844");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__category__19093A0BCB572AF9");

            entity.ToTable("Category");

            entity.Property(e => e.CategoryTitle)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<News>(entity =>
        {
            entity.HasKey(e => e.NewsId).HasName("PK__News__954EBDF3C48C4033");

            entity.HasIndex(e => e.NewsLink, "UQ__News__4BEBCC122B7247C6").IsUnique();

            entity.Property(e => e.ClickCount).HasDefaultValue(0);
            entity.Property(e => e.NewsDescription).IsUnicode(false);
            entity.Property(e => e.NewsLink)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.NewsPublishDateTime).HasColumnType("datetime");
            entity.Property(e => e.NewsTitle)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Agency).WithMany(p => p.News)
                .HasForeignKey(d => d.AgencyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__News__AgencyId__44FF419A");

            entity.HasOne(d => d.Category).WithMany(p => p.News)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__News__CategoryId__440B1D61");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__206D91709B6E6801");

            entity.HasIndex(e => e.Email, "UQ__Users__A9D10534B2844701").IsUnique();

            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
