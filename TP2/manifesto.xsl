<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    <xsl:output method="html" indent="yes"/>
    <xsl:template match="/">
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="manifesto">
        <html>
            <head>
                <title>Project Record</title>
                <meta charset="UTF-8"/>
            </head>
            <body>
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="meta">
        <div>
            <xsl:apply-templates/>
        </div>
        <br/>
        <hr/>
    </xsl:template>
    
    <xsl:template match="equipa">
        <hr/>
        <h3>EQUIPA</h3>
        <div>    
            <xsl:apply-templates/>
        </div>
        <br/>
        <hr/>
    </xsl:template>
    
    <xsl:template match="resumo">
        <hr/>
        <div>
            <h3>RESUMO</h3>
            <xsl:apply-templates/>
        </div>
        <br/>
        <hr/>
    </xsl:template>
    
    <xsl:template match="titulo_site">
        <h1 align="center">
            <xsl:value-of select="."/>
            <hr/>
        </h1>
    </xsl:template>
    
    <xsl:template match="resultados">
        <hr/>
        <div>
            <h3>ENTREGÁVEIS</h3>
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="resultado">
        <a href="{url}">
            <xsl:value-of select="nome"/>
            <br/>
        </a>
    </xsl:template>
    
    <xsl:template match="paragrafo">
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="bold">
        <b><xsl:value-of select="."/></b>
    </xsl:template>
    
    <xsl:template match="italic">
        <i><xsl:value-of select="."/></i>
    </xsl:template>
    
    <xsl:template match="membro">
        <div>
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="identificador">
        <b>IDENTIFICADOR: </b> <xsl:value-of select="."/>
        <br/>
    </xsl:template>
    
    <xsl:template match="titulo">
        <b>TÍTULO: </b> <xsl:value-of select="."/>
        <br/>
    </xsl:template>
    
    <xsl:template match="subtitulo">
        <b>SUBTÍTULO: </b> <xsl:value-of select="."/>
        <br/>
    </xsl:template>
    
    <xsl:template match="data_inicio">
        <b>DATA DE INÍCIO: </b> <font color="#008000"><xsl:value-of select="."/></font>
        <br/>
    </xsl:template>
    
    <xsl:template match="data_fim">
        <b>DATA DE FIM:</b><font color="#008000"><xsl:value-of select="."/></font>
        <br/>
    </xsl:template>
    
    <xsl:template match="supervisor">
        <div>
            <h4>SUPERVISOR</h4>
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="nome">
        <b>NOME: </b> <xsl:value-of select="."/>
    </xsl:template>
    
    <xsl:template match="email">
        <a href="http://mailto:{.}">
            <xsl:value-of select="."/>
            <br/>
        </a>
    </xsl:template>
    
    <xsl:template match="foto">
        <img src="{foto}"/>
    </xsl:template>
    
    <xsl:template match="website">
        <a href="{.}">
            <xsl:value-of select="."/>
            <br/>
        </a>
    </xsl:template>
</xsl:stylesheet>