<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="website/index.html">
            <html>
                <head>
                    <meta charset="UTF-8"/>
                    <title>The Book Of Mormon</title>
                </head>
                <body>
                    <h1>The Book Of Mormon</h1>
                    <h2>Index</h2>
                    <ol>
                        <xsl:apply-templates mode="indice"/>
                    </ol>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>

    <xsl:template match="coverpg|titlepg|preface" mode="indice"/>

    <xsl:template match="book|sura" mode="indice">
        <li>
            <a href="{bktshort}.html"><xsl:value-of select="bktlong"/></a>
        </li>
    </xsl:template>
    
    <xsl:template match="book">
        <xsl:result-document href="website/{bktshort}.html">
            <html>
                <head>
                    <meta charset="UTF-8"/>
                    <title><xsl:value-of select="btkshort"/></title>
                </head>
                <body>
                    <address>[<a href="index.html">Back to homepage</a>]</address>
                    <table width="100%">
                        <tr>
                            <td width="20%" valign="top">
                                <h2><a name="indice_chapters">Index</a></h2>
                                <ol>
                                    <xsl:apply-templates mode="indice_chapters"/>
                                </ol>
                            </td>
                            <td width="80%">
                                <xsl:apply-templates/>
                            </td>
                        </tr>
                    </table>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
    <xsl:template match="sura">
        <xsl:result-document href="website/{bktshort}.html">
            <html>
                <head>
                    <meta charset="UTF-8"/>
                    <title><xsl:value-of select="btkshort"/></title>
                </head>
                <body>
                    <address>[<a href="index.html">Back to homepage</a>]</address>
                    <xsl:apply-templates/>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
    <xsl:template match="chapter" mode="indice_chapters">
        <li>
            <a href="#{generate-id()}"><xsl:value-of select="chtitle"/></a>
        </li>
    </xsl:template>
    
    <xsl:template match="bktlong|bktshort|bksum" mode="#all"/>
    
    <xsl:template match="chapter">
        <a href="#indice_chapters">Back to index</a>
        <br/>
        <a name="{generate-id()}"/>
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="chtitle">
        <xsl:value-of select="."/>
    </xsl:template>

    <xsl:template match="v">
        <p>[<xsl:value-of select="count(preceding-sibling::*)-1"/>] <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="bktlong">
        <h1><xsl:value-of select="."/></h1>
    </xsl:template>
    
    <xsl:template match="bksum|chsum">
        <div><b>Summary:</b><xsl:apply-templates/></div>
    </xsl:template>
    
    <xsl:template match="p">
        <p><xsl:value-of select="."/></p>
    </xsl:template>
    
</xsl:stylesheet>